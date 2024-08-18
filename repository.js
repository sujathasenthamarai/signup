

const fs = require('fs')

class Repository {
	constructor(filename) {

		// The filename where datas are
		// going to store
		if (!filename) {
			throw new Error(
				'Filename is required to create a datastore!')
		}
		this.filename = filename
		try {
			fs.accessSync(this.filename)
		} catch (err) {

			// If file not exist it is 
			// created with empty array
			fs.writeFileSync(this.filename, '[]')
		}
	}

	// Get all existing records
	async getAll() {
		return JSON.parse(
			await fs.promises.readFile(this.filename, {
				encoding: 'utf8'
			})
		)
	}

	// Find record by properties
	async getOneBy(filters) {
		const records = await this.getAll()
		for (let record of records) {
			let found = true
			for (let key in filters) {
				if (record[key] !== filters[key]) {
					found = false
				}
			}
			if (found) return record;
		}
	}

	// Create new record
	async create(attrs) {
		const records = await this.getAll()
		records.push(attrs)
		await fs.promises.writeFile(
			this.filename,
			JSON.stringify(records, null, 2)
		)
		return attrs
	}
}

// The 'datastore.json' file created at runtime 
// and all the information provided via signup form
// store in this file in JSON format.
module.exports = new Repository('datastore.json')
