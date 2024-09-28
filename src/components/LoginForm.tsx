import { useState } from 'react';
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RainbowButton } from "./magicui/rainbow-button";

interface LoginFormProps {
	onLogin: (username: string, password: string, type: 'customer' | 'admin') => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onLogin(username, password, 'customer');
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSubmit(e as unknown as React.FormEvent);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="username">Username</Label>
				<Input
					id="username"
					placeholder="Enter your username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					onKeyPress={handleKeyPress}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onKeyPress={handleKeyPress}
				/>
			</div>
			<RainbowButton type="submit" style={{ width: "-webkit-fill-available" }}>
				Login
			</RainbowButton>
		</form>
	);
}
