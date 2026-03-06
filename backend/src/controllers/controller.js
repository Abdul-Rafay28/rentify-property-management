import bcrypt from 'bcrypt';
import stateModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import cloudinary from '../../config/cloudinary.js';
import productModel from '../models/addPropert.js';
import reqModel from '../models/req.model.js';


export const userSignUp = async (req, resp) => {
    try {
        console.log(req.body)

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return resp.status(400).json({
                message: 'All fields are required!',
                success: false,
            })
        }

        const emailCheck = await stateModel.findOne({ email });
        if (emailCheck) {
            return resp.status(409).json({
                message: "Email already exists!",
                success: false,
            })
        }

        const hashPass = await bcrypt.hash(password, 10);
        const userData = await stateModel.create({ name, email, password: hashPass })

        resp.status(200).json({
            message: 'SignUp successfully',
            success: true,
            user: userData,
        })
    } catch (err) {
        resp.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

export const userLogin = async (req, resp) => { 
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return resp.status(400).json({
                message: 'Email & Password must required!',
                success: false,
            })
        }

        const emailCheck = await stateModel.findOne({ email });
        if (!emailCheck) {
            return resp.status(409).json({
                message: "Invalid email!",
                success: false,
            })
        }

        const passwordCheck = await bcrypt.compare(password, emailCheck.password)
        if (!passwordCheck) {
            return resp.status(400).json({
                message: 'Invalid password',
                success: false,
            })
        }

        if (!emailCheck.isActive) {
            return resp.status(401).json({
                message: 'your account has not approved you need contact admin!',
                success: false,
            })
        }

        const token = await jwt.sign({ id: emailCheck._id, role: emailCheck.role }, process.env.JWT_KEY, { expiresIn: '1d' });
        resp.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        })

        return resp.status(200).json({
            success: true,
            message: `${emailCheck.role} logged in`,
            token,
            role: emailCheck.role,
        })
    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const addProperty = async (req, resp) => {
    try {
        const { title, description, price, location, purpose } = req.body;
        if (!title || !price || !location || !req.files || req.files.length === 0 || !purpose) {
            return resp.status(400).json({
                message: 'All fields are required!',
                success: false,
            })
        }
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        const imageUrl = await Promise.all(
            req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path);
                return result.secure_url;
            })
        )
        const property = await productModel.create({ title, description, price, location, purpose, images: imageUrl, createdBy: req.user.id });


        resp.status(200).json({
            message: 'Add property successfully!',
            success: true,
            property,
        })

    } catch (err) {
        resp.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

export const authCheck = async (req, resp) => {
    try {
        resp.status(200).json({
            message: 'Welcome User!',
            success: true,
        })

    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const getPropert = async (req, resp) => {
    try {
        const allProperty = await productModel.find({ isActive: true }).sort({ createdAt: -1 });
        resp.status(200).json({
            message: 'Get all properties',
            success: true,
            property: allProperty,
        });
    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const getSinglePropert = async (req, resp) => {
    try {
        const id = req.params.id;
        const getId = await productModel.findById(id);
        if (!getId) {
            return resp.status(404).json({
                message: "Propert not found",
                success: false,
            })
        }

        if (!getId.isActive) {
            return resp.status(404).json({
                message: 'Property not found',
                success: false,
            })
        }

        resp.status(200).json({
            message: 'Available property',
            success: true,
            property: getId,
        })

    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const allUsersData = async (req, resp) => {
    try {
        if (req.user.role != 'admin') {
            return resp.status(403).json({
                message: 'Forbidden!',
                success: false,
            })
        }

        const usersData = await stateModel.find({ role: 'sale' }).select('-password');
        resp.status(200).json({
            success: true,
            users: usersData,
        })

    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const updateUserData = async (req, resp) => {
    try {
        const { id } = req.params;
        const user = await stateModel.findById(id);
        if (!user) {
            return resp.status(404).json({
                message: 'User not found!',
                success: false,
            })
        }

        user.isActive = !user.isActive;
        await user.save();

        resp.status(200).json({
            success: true,
        })

    } catch (err) {
        resp.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

export const getAllUsersProperty = async (req, resp) => {
    try {
        if (req.user.role != 'admin') {
            return resp.status(403).json({
                message: 'Forbidden',
                success: false,
            })
        }

        const allusersProperty = await productModel.find().populate('createdBy', "name email");

        resp.status(200).json({
            message: 'Welcome admin',
            success: true,
            UsersProperty: allusersProperty,
        })

    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const getUserPropertyId = async (req, resp) => {
    try {
        const { id } = req.params;
        const property = await productModel.findById(id);
        if (!property) {
            return resp.status(404).json({
                message: 'Product not found!',
                success: false,
            })
        }

        property.isActive = !property.isActive;

        await property.save();

        resp.status(200).json({
            success: true,
        })

    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const userReq = async (req, resp) => {
    try {
        const propertyId = req.params.id;
        const { name, email, number, message } = req.body;
        console.log(name, email, number, message, propertyId)
        if (!name || !email || !number || !message || !propertyId) {
            return resp.status(400).json({
                message: 'All fields are required!',
                success: false,
            })
        }
        const idCheck = await productModel.findById(propertyId)

        if (!idCheck) {
            return resp.status(404).json({
                message: 'Property not found!',
                success: false,
            })
        }

        const userClient = await reqModel.create({ name, email, number, message, propertyId, agentId: idCheck.createdBy })

        resp.status(200).json({
            message: 'Your request submitted we will contact you ',
            success: true,
        })

    } catch (err) {
        resp.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

export const getUsersReq = async (req, resp) => {
    try {
        if (req.user.role != 'admin') {
            return resp.status(403).json({
                message: 'Forbidden!',
                success: false,
            })
        }

        const getReq = await reqModel.find()
            .populate('propertyId', 'title location purpose price')
            .populate('agentId', 'name email')


        resp.status(200).json({
            success: true,
            data: getReq,
        })

    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const logout = async (req, resp) => {
    try {
        resp.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        })

        resp.status(200).json({
            success: true,
            message: 'Logout successfully'
        })
    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}


// export const adminSign = async (req, resp) => {
//     try {
//         const { name, email, password} = req.body;
//         if (!name || !email || !password) {
//             return resp.status(400).json({
//                 message: "All fields are required!",
//                 success: false,
//             })
//         }

//         const adminEmail = await stateModel.findOne({ email });

//         if (adminEmail) {
//             return resp.status(409).json({
//                 message: 'Email already exists',
//                 success: false,
//             })
//         }

//         const hashPass = await bcrypt.hash(password, 10);

//         const admin = await stateModel.create({ name, email, password: hashPass });

//         resp.status(200).json({
//             message: 'Admin added successfully!',
//             success: false,
//             data: admin,
//         })
//     } catch (err) {
//         resp.status(500).json({
//             message: err.message,
//             success: false,
//         })
//     }

// }