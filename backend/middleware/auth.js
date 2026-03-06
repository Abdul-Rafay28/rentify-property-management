import jwt from 'jsonwebtoken';


function verifytoken(req, resp, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return resp.status(401).json({
                message: 'token not provided!',
                success: false,
            })
        }

        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return resp.status(401).json({
                    message: 'Invalid & expire token!',
                    success: false,
                })
            }
            
            req.user = decoded;
            next();
        })


    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }

}

export default verifytoken;