
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

    async find(condition = {}) {
        return await this.modelName.find(condition)
    }

    async create(payload) {
        return await this.modelName.create(payload)
    }
    async deleteOne(condition) {
        return await this.modelName.deleteOne(condition);
    }
    async updateOne(condition, payload) {
        
        return await this.modelName.updateOne(condition, { $set: payload });
    }
    async findByIdAndUpdate(id, payload) {
        return await this.modelName.findByIdAndUpdate(id, { $set: payload });
    }
}