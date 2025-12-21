export function validateParamId(req, res, next) {
    let id = req.params.id;
    if (/^\d+/.test(id)) next();
    else res.status(400).send("failure: parameter id does not exist");
}