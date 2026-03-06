export const allowRoles = (roles) => {
    return (req, resp, next) => {
        if (req.user.role === "admin") {
            return next();
        }

        if (!roles.includes(req.user.role)) {
            return resp.status(403).json({
                message: 'Access denied',
                success: false,
            })
        }

        next();
    }
}