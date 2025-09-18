import bcrypt from "bcrypt";

export const mockUser = {
  id: 1,
  name: "Lucas",
  email: "right@email.com",
  image: "https://example.com/lucas.jpg",
  password: bcrypt.hashSync("right-password", 10),
  _unhashedPassword: "right-password",
};
