import { User } from '../models';

export const isUserValid = (user: any) => {
    if (user.username && user.password && user.firstName && user.lastName) { 
        if (
            user.username.length > 5 && 
            user.password.length > 5 && 
            user.firstName.length > 2 && 
            user.lastName.length > 3) {
                return true
            }
    }

    return false;
};

export const doesUserExist = async (username: string) => {
    let a: number = await User.count({where: {
        username: username
    }});

    return a !== 0;
};
