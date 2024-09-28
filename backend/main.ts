//import socketioclient
import io from 'socket.io-client';
import path from 'node:path'
import { app, BrowserWindow, ipcMain, screen, globalShortcut } from 'electron'
import log from 'electron-log'
import electronUpdater from 'electron-updater'
import electronIsDev from 'electron-is-dev'
import ElectronStore from 'electron-store'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import isDev from 'electron-is-dev'
import os from 'os'
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const { autoUpdater } = electronUpdater
let appWindow: BrowserWindow | null = null
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const store = new ElectronStore()

class AppUpdater {
	constructor() {
		log.transports.file.level = 'info'
		autoUpdater.logger = log
		autoUpdater.checkForUpdatesAndNotify()
	}
}

const installExtensions = async () => {
	/**
	 * NOTE:
	 * As of writing this comment, Electron does not support the `scripting` API,
	 * which causes errors in the REACT_DEVELOPER_TOOLS extension.
	 * A possible workaround could be to downgrade the extension but you're on your own with that.
	 */
	/*
	const {
		default: electronDevtoolsInstaller,
		//REACT_DEVELOPER_TOOLS,
		REDUX_DEVTOOLS,
	} = await import('electron-devtools-installer')
	// @ts-expect-error Weird behaviour
	electronDevtoolsInstaller.default([REDUX_DEVTOOLS]).catch(console.log)
	*/
}

const spawnAppWindow = async () => {
	if (electronIsDev) await installExtensions()

	const RESOURCES_PATH = electronIsDev
		? path.join(__dirname, '../../assets')
		: path.join(process.resourcesPath, 'assets')

	const getAssetPath = (...paths: string[]): string => {
		return path.join(RESOURCES_PATH, ...paths)
	}

	const PRELOAD_PATH = path.join(__dirname, 'preload.js')

	const { width, height } = screen.getPrimaryDisplay().workAreaSize

	appWindow = new BrowserWindow({
		width: width,
		height: height,
		icon: getAssetPath('icon.png'),
		show: false,
		fullscreen: isDev ? false : true,
		kiosk: true,
		alwaysOnTop: isDev ? false : true,
		webPreferences: {
			preload: PRELOAD_PATH,
			nodeIntegration: false,
			contextIsolation: true,
		},
	})

	appWindow.loadURL(
		electronIsDev
			? 'http://localhost:4000'
			: `file://${path.join(__dirname, '../../frontend/build/index.html')}`
	)
	appWindow.setMenu(null)
	appWindow.show()

	if (electronIsDev) appWindow.webContents.openDevTools({ mode: 'right' })

	appWindow.on('closed', () => {
		appWindow = null
	})

	// Prevent the app from exiting
	// app.on('before-quit', (event) => {
	//   event.preventDefault()
	// })

	// Modify this to allow Escape key for admin logout
	appWindow.webContents.on('before-input-event', (event, input) => {
		if (input.type === 'keyDown' && (input.key === 'F11' || (input.control && input.key === 'W') || (input.meta && input.key === 'q'))) {
			event.preventDefault()
		}
	})

	// Development shortcut
	if (electronIsDev) {
		globalShortcut.register('Command+Shift+I', () => {
			// quit app
			app.quit()
		});
		globalShortcut.register('Command+\\', () => {
			if (appWindow) {
				appWindow.loadURL('http://localhost:4000/games')
			}
		})
	}
}

app.on('ready', () => {
	new AppUpdater()
	spawnAppWindow()

	// Socket.io client
	const socket = io('http://localhost:34012', {
		transports: ['websocket'],
	})
	//all os info send to server
	// how can i get the pc uuid or id
	// I am looking for a unique id for the pc
	const uniqueId = () => {
		if (os.platform() === "win32") {
			return exec(`wmic csproduct get uuid`).toString();
		} else if (os.platform() === "darwin") {
			return exec(`ioreg -l | grep IOPlatformUUID`).toString();
		}
	}

	const osInfo = () => {
		if (os.platform() === "win32") {
			return {
				os: os.platform(),
				osVersion: os.version(),
				osRelease: os.release(),
				osType: os.type(),
				osArch: os.arch(),
				osHostname: os.hostname(),
				osTmpdir: os.tmpdir(),
				osUserInfo: os.userInfo(),
				uniqueId: uniqueId(),
			}
		} else if (os.platform() === "darwin") {
			return {
				os: os.platform(),
				osVersion: os.version(),
				osRelease: os.release(),
				osType: os.type(),
				osArch: os.arch(),
				osHostname: os.hostname(),
				osTmpdir: os.tmpdir(),
				uniqueId: uniqueId(),
			}
		}
	}
	
	socket.emit("api:create",);

	// I am looking for 3. System Serial Number for windows

	socket.on('connect', () => {
		console.log('Connected to server')
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

/*
 * ======================================================================================
 *                                IPC Main Events
 * ======================================================================================
 */

ipcMain.handle('sample:ping', () => {
	return 'pong'
})


ipcMain.handle('admin-login', () => {
	// Here you would typically implement a secure authentication process
	// For demonstration purposes, we're using a simple password check

	if (appWindow) {
		appWindow.setKiosk(false);
		appWindow.setFullScreen(false);
		appWindow.setAlwaysOnTop(false);
		appWindow.minimize();
		return true;
	}
	return false;
})

// Add a new IPC handler for admin logout
ipcMain.handle('admin-logout', () => {
	if (appWindow) {
		appWindow.setKiosk(true);
		appWindow.setFullScreen(true);
		appWindow.setAlwaysOnTop(true);
		appWindow.restore();
		appWindow.focus();
	}
})

// Add a new IPC handler for getting user data
ipcMain.handle('get-user-data', () => {
	// This is a placeholder. In a real app, you'd fetch this data from a database or API
	return {
		success: true,
		balance: 100,
		timeLeft: 60, // in minutes
		bonusEarned: 20
	}
})

ipcMain.handle('message', (event, message) => {
	console.log(message)
})


ipcMain.handle("customer-login", (event, message) => {
	console.log("Customer login attempt:", message);

	// Simulating user authentication
	const isValidUser = true; // Replace with actual authentication logic

	if (isValidUser) {
		if (appWindow) {
			// Change the window state to show the desktop view
			appWindow.setKiosk(false);
			appWindow.setFullScreen(false);
			appWindow.setAlwaysOnTop(false);

			// Send a message to the renderer process to change the UI
			appWindow.webContents.send('show-desktop-view');

			// Resize the window to a smaller width
			appWindow.setSize(400, 600); // Reduced width from 800 to 400

			// Set position to bottom right
			const { width, height } = screen.getPrimaryDisplay().workAreaSize;
			appWindow.setPosition(width - 400, height - 600);

			// how can i hide topbar?
			appWindow.setSkipTaskbar(true);
			appWindow.removeMenu();
			appWindow.menuBarVisible = true;
			appWindow.setMenuBarVisibility(true)
			//please don't show the below scrollbar
			appWindow.webContents.executeJavaScript(`document.body.style.overflow = 'hidden';`);
		};

		// Return user data
		return {
			success: true,
			userName: "John Doe",
			name: "John",
			lastName: "Doe",
			balance: 100,
			timeLeft: 60,
			bonusEarned: 20,
			totalAmount: 1000,
			message: "Login successful"
		};
	} else {
		return {
			success: false,
			message: "Invalid credentials"
		};
	}
})

ipcMain.handle("customer-logout", (event, message) => {
	console.log(message)
})
