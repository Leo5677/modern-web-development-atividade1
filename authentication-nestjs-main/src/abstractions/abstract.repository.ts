export abstract class AbstractRepository<E extends { id: number }> {

    constructor(
        protected document: E[]
    ) {}

    public async findAll(): Promise<E[]> {
        return new Promise((resolve, reject) => {
            resolve(this.document)
        })
    }
    
    public async findByPk(id: number): Promise<E | null> {
        return new Promise((resolve, reject) => {
            resolve(this.document.find(doc => doc.id == id))
        })
    }

    public abstract create(record: E): Promise<E | null>
    public abstract update(record: E): Promise<E | null>

    public async delete(id: number): Promise<Boolean> {
        const finded = await this.findByPk(id)
        return new Promise((resolve, reject) => {
            if (finded) {
                this.document = this.document.filter(doc => doc.id != id)
                resolve(true)
            } else {
                resolve(false)
            }
        })
    }

}