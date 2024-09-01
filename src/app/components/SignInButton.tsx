"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
const SigninButton = () => {
	const { data: session } = useSession();

	if (session) {
		return (
			<div className="ml-auto flex items-center gap-4">
				<p className="text-sky-600">{session.user.name}</p>
				<button onClick={() => signOut()} className="text-red-600">
					Sign Out
				</button>
			</div>
		);
	}

	return (
		<button onClick={() => signIn('google')} className="ml-auto text-green-600">
			Sign In with Google
		</button>
	);
};

export default SigninButton;
