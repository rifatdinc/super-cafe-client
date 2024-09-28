'use client';
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { BalanceBox } from "@/components/BalanceBox";
import { LoginForm } from "@/components/LoginForm";
import SparklesText from "@/components/magicui/sparkles-text";
import { Divider } from "@nextui-org/react";
import ShimmerButton from "@/components/magicui/shimmer-button";
import Particles from "@/components/magicui/particles";
import { useTheme } from "next-themes";

declare global {
	interface Window {
		electron: {
			ipcRenderer: {
				send: (channel: string, ...args: any[]) => void;
				on: (channel: string, func: (...args: any[]) => void) => void;
				invoke: (channel: string, ...args: any[]) => Promise<any>;
			};
		};
	}
}

export default function HomePage() {
	const userName = "John Doe"
	const timeLimit = Math.floor(Math.random() * 60) + 1
	const BALANCE = 50.00
	const superbPoints = 100
	const customButtonText = "Order Now"

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [message, setMessage] = useState<string>('');
	const videoRef = useRef<HTMLVideoElement>(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [balance, setBalance] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);
	const [electronAvailable, setElectronAvailable] = useState(false);
	const { theme } = useTheme();
	const [color, setColor] = useState(theme === "dark" ? "#000000" : "#ffffff");

	useEffect(() => {
		setColor(theme === "dark" ? "#000000" : "#ffffff");

		if (videoRef.current) {
			videoRef.current.playbackRate = 0.75;
		}
		const fetchData = async () => {
			if (typeof window !== 'undefined' && window.electron) {
				setElectronAvailable(true);
				window.electron.ipcRenderer.on('message', (msg: string) => {
					setMessage(msg);
				});

			}
		}

		fetchData();
	}, [theme]);

	const renderLoginForm = (type: 'customer' | 'admin') => (
		<LoginForm onLogin={(username, password) => handleLogin(username, password, type)} />
	);

	const handleLogin = async (username: string, password: string, type: 'customer' | 'admin') => {
		console.log(`${type} login:`, { username, password });
		if (type === 'admin') {
			// Call Electron IPC to handle admin login

		} else {
			if (electronAvailable) {
				try {
					console.log(await window.electron.ipcRenderer.invoke("get-user-data"))
					const result = await window.electron.ipcRenderer.invoke('customer-login', { username, password });
					if (result.success) {
						setIsLoggedIn(true);
						setBalance(result.balance);
						setTotalAmount(result.totalAmount);
					} else {
						console.error('Login failed:', result.message);
						setMessage('Login failed: ' + (result.message || 'Unknown error'));
					}
				} catch (error) {
					console.error('Error during login:', error);
					setMessage('Error during login: ' + (error instanceof Error ? error.message : String(error)));
				}
			} else {
				setMessage('Electron is not available. Are you running in development mode?');
			}
		}
	};

	const handleAdminLogout = () => {
		if (window.electron && window.electron.ipcRenderer) {
			window.electron.ipcRenderer.send('admin-logout');
			setElectronAvailable(false);
		}
	};

	const handleLogout = async () => {
		if (electronAvailable) {
			try {
				const result = await window.electron.ipcRenderer.invoke('customer-logout');
				if (result.success) {
					setIsLoggedIn(false);
					setBalance(0);
					setTotalAmount(0);
					setUsername('');
					setPassword('');
				}
			} catch (error) {
				console.error('Error during logout:', error);
				setMessage('Error during logout: ' + (error instanceof Error ? error.message : String(error)));
			}
		} else {
			setMessage('Electron is not available. Are you running in development mode?');
		}
	};

	return (
		(!isLoggedIn ?
			<div className="flex flex-col min-h-screen">
				<video
					ref={videoRef}
					autoPlay
					loop
					muted
					className="fixed inset-0 w-full h-full object-cover"
				>
					<source src="/placeholder.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>

				<main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
					<Card className="w-full max-w-md bg-background/10 backdrop-blur-sm" >
						<CardHeader>
							<CardTitle className="text-2xl font-bold text-center">
								Superb Cafe
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{renderLoginForm('customer')}
							{message && (
								<div className="text-red-500 text-center mt-2">
									{message}
								</div>
							)}
						</CardContent>
					</Card>
				</main>

				{/* Balance box for logged-in customers */}
				{isLoggedIn && (
					<BalanceBox balance={balance} totalAmount={totalAmount} />
				)}
			</div>
			: <>
				<div className="flex flex-col min-h-screen">
				<Particles
							className="absolute inset-0"
							quantity={250}
							staticity={250}
							ease={40}
							color={color}
							refresh
						/>
					<header className="p-4">
						<span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text 
						text-center text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10
						flex items-center justify-center h-16 w-full
						">
							Suberb Cafe
						</span>
						<Divider />

					</header>

					<main className=" flex flex-col items-center justify-center p-4">

						<Card className="w-full max-w-md bg-background/10 backdrop-blur-sm">
							<CardHeader>
								<CardTitle ><SparklesText className="text-lg font-semibold" sparklesCount={2} text={`Hoşgeldiniz ${userName}`} /></CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p>{timeLimit ? `Time remaining: ${timeLimit}` : "Unlimited stay"}</p>
								<p>Superb Points: {superbPoints}</p>
							</CardContent>
						</Card>
					</main>

					<footer className="mt-auto p-4">
						<div className="flex justify-between space-x-4">
							<ShimmerButton className="shadow-2xl">
								<span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
									Log Out
								</span>								</ShimmerButton>
							<ShimmerButton className="shadow-2xl">
								<span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
									{customButtonText}
								</span>
							</ShimmerButton>

						</div>
					</footer>
				</div>
			</>
		));
};
