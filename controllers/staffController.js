const Staff = require('../models/staff')

exports.index = async (req, res, next) => {
    const staff = await Staff.find().sort({ _id: -1});
    res.status(200).json({
        data: {}
    })
}

exports.show = async (req, res, next) => {
    try {
        const {id} = req.params;
        const staff = await Staff.findById(id);

        if (!staff) {
            throw new Error('Data not found')
        }

        res.status(200).json({
            data: staff
        })
    } catch (error) {
        res.status(400).json({
            error: {
                message: 'error: ' + error.message
            }
        });
    }
}

exports.insert = async (req, res, next) => {

    const {name, salary} = req.body

    let staff = new Staff({
        name: name,
        salary: salary
    })
    await staff.save()

    res.status(200).json({
        message: 'Data has been added'
    });
}