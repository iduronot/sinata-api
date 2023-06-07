const PembaruanInformasis = require('../models/tb_laypeminformasi')
const Accounts = require('../models/tb_account')

module.exports = {
    viewPeminformasi: async (req, res) => {
        const page = req.query.page || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = (page - 1) * limit
        try {
            const totalRow = await PembaruanInformasis.count()
            const totalPage = Math.ceil(totalRow / limit)
            const peminformasi = await PembaruanInformasis.findAll({
                include: {
                    model: Accounts,
                    required: true
                },
                limit,
                offset,
                order: [
                    [ 'createdAt', 'DESC' ]
                ]
            })

            const modifiedPeminformasi = peminformasi.map(item => {
                const modifiedItem = { ...item.toJSON() }
                modifiedItem.tb_account.password = undefined
                return modifiedItem
            })

            res.status(200).json({
                message: `Berhasil menampilkan ${peminformasi.length} Layanan Pembaruan Informasi di Laman UNS`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: modifiedPeminformasi
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    addPeminformasi: async (req, res) => {
        const payload = req.body
        try {
            const peminformasi = await PembaruanInformasis.create(payload)
            await peminformasi.save()

            res.status(201).json({
                message: `Layanan '${payload.judul_permohonan}' berhasil ditambahkan.`,
                data: peminformasi
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    editPeminformasi: async (req, res) => {
        const { id } = req.params
        const payload = req.body
        try {
            const peminformasi = await PembaruanInformasis.findByPk(id)
            if(peminformasi) {
                Object.assign(peminformasi, payload)
                await peminformasi.save()

                res.status(200).json({
                    message: `Layanan '${payload.judul_permohonan}' berhasil diperbarui`,
                    data: peminformasi
                })
            } else{
                res.status(404).json({
                    message: 'Data permbaruan informasi di laman tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    deletePemInformasi: async (req, res) => {
        const { id } = req.params
        try {
            const peminformasi = await PembaruanInformasis.findByPk(id)
            if(peminformasi) {
                await peminformasi.destroy()

                res.status(200).json({
                    message: `Data '${peminformasi.judul_permohonan}' berhasil dihapus`,
                })
            } else {
                res.status(404).json({
                    message: 'Data permbaruan informasi di laman tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    }
}