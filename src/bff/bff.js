import { getUsers } from "./get-users";
import { addUser } from './add-user'
import { createSession } from './create-session';

export const server = {
  async authorize(authLogin, authPassword) {
    const user = await getUsers(authLogin);

    if (!user) {
      return {
        error: "Такой пользователь не найден",
        res: null,
      };
    }

    if (authPassword !== user.password) {
      return {
        error: "Неверный пароль",
        res: null,
      };
    }

  return {
      error: null,
      res: createSession(user.role_id),
    };
  },
  async register(regLogin, regPassword) {
    const user = await getUsers(regLogin);

    if (user) {
      return {
        error: "Такой логин уже занят",
        res: null,
      };
    }

    await addUser(regLogin, regPassword);

    const session = {
      logout() {
        Object.keys(session).forEach((key) => {
          delete session[key];
        });
      },
      removeComment() {
        console.log("Удаление комментария");
      },
    };

    return {
      error: null,
      res: createSession(user.role_id),
    };
  },
};
