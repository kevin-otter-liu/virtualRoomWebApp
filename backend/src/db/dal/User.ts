import UserModel from '../models/User';

export const create = async (payload: UserModel): Promise<UserModel> => {
  const user = await UserModel.create(payload);
  return user;
};
