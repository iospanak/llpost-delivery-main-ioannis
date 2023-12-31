import { useEffect, useState } from 'react';

import { apiService, goToLogin } from '../services/api.service';

// export function useUser(redirectTo = '/login', redirectIfFound = false): { user: null } {
//   useEffect((): void => {
//     if (authenticationService.token.value && redirectIfFound) {
//       Router.push(redirectTo).then((_) => {});
//       return;
//     }
//     if (!authenticationService.token.value && !redirectIfFound) {
//       Router.push(redirectTo).then((_) => {});
//     }
//   }, [redirectTo, redirectIfFound, authenticationService.token]);
//
//   return { user: null };
// }

export function useUser(): { firstName: string, lastName: string, avatar: string } | null {
	const [user, setUser] = useState(null);
	const getUser = async () => {
		const u = await apiService.get('/auth/me');
		if (u.role !== 'DD') {
			await goToLogin();
			return;
		}
		setUser(u);
	};
	useEffect(() => {
		getUser().then((_) => null);
	}, []);
	return user;
}
