/**
 *
 * @param req
 * @param resp
 * @param next
 */
const list = (req, resp, next) => {
    resp
        .status(200)
        .json({
            result: 'success',
            message: null,
            data: null
        });

}

export default {list};
