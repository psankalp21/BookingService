
export default class BaseEntity {
    protected modelName: any

    constructor(modelname) {
        this.modelName = modelname;
    }

    async findOne(condition) {
        return await this.modelName.findOne(condition)
    }
    async findById(condition) {
        return await this.modelName.findById(condition)
    }

    async find(condition?:any) {
        if (condition)
            return await this.modelName.find(condition)
        else
            return await this.modelName.find()

    }

    async create(payload) {
        return await this.modelName.create(payload)
    }
    async deleteOne(condition) {
        return await this.modelName.deleteOne(condition);
    }
    async findByIdAndUpdate(id,payload)
    {
        return await this.modelName.findByIdAndUpdate({_id:id},{$set: payload},{new: true})
    }
    async updateOne(id, payload) {
        return await this.modelName.updateOne({ _id: id }, { $set: payload });
    }
}