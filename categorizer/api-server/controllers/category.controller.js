/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 *
 */
const list = (req, resp, next) => {

    // let task = req.body;
    // console.log(`cardId: ${req.params['cardId']}에 task name: ${task.name} 추가`);
    // task.id = Date.now();

    resp
        .status(200)
        .json({
            result: 'success',
            message: null,
            data: Date.now()
        });

}

export default {list};
