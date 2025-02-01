import { userModel as User } from "../models/user.js";
import { sendResponse } from "../utils/utils.js";

const handleGetRegister = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.create({ email, password});
        sendResponse(res, 201,'User registered successfully', { user });
    }catch (error) {
        sendResponse(res, 500, 'Error adding user', error);
    }
};

const handleGetLogin = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ where: { email } });
        if (!user || password !== user.password) {
            sendResponse(res, 401, 'User Not Found');
        }
        sendResponse(res, 200, 'Login successful', { user });
    }catch (error) {
        sendResponse(res, 500, 'Error during login', error);
    }
};

export {
    handleGetLogin,
    handleGetRegister
};
