export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body;
    } catch (error) {
        next(error);
    }
};
