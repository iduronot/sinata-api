'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()
const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tb_account', [
      {
        id: uuidv4(),
        username: 'superadmin',
        email: 'superadmin@admin.com',
        name: 'Super Admin',
        password: '$2a$16$3Zt9NiiHUWjl8xjNwTpjOuCTpBonbhXg.jGlqgQTYr5NWfvssy3je', // => password
        no_identitas: '33311237677512',
        unit: 'UPT Humas dan Media',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyYWRtaW4iLCJlbWFpbCI6InN1cGVyYWRtaW5AYWRtaW4uY29tIiwibmFtZSI6IlN1cGVyIEFkbWluIiwicm9sZSI6IlN1cGVyIEFkbWluIn0.CjtOx89cXESLEchBS6k8IYgfG_w5Vd991-fkj9q5DA8',
        role: 'Super Admin',
        kontak: '08888888888',
        img_profil: 'superadmin-ava.jpg',
        createdAt: now,
        updatedAt: now
      },
      {
        id: uuidv4(),
        username: 'usersinata11',
        email: 'usersinata11@user.com',
        name: 'User Sinata 11',
        password: '$2a$16$3Zt9NiiHUWjl8xjNwTpjOuCTpBonbhXg.jGlqgQTYr5NWfvssy3je', // => password
        no_identitas: 'M3119016',
        unit: 'Sekolah Vokasi UNS',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJzaW5hdGExMSIsImVtYWlsIjoidXNlcnNpbmF0YTExQHVzZXIuY29tIiwibmFtZSI6IlVzZXIgU2luYXRhIDExIiwicm9sZSI6IlVzZXIifQ.WigEeb_srCCpx3uROdc4OqeZGWJnma58PpcRA2vwa6s',
        role: 'User',
        kontak: '085123777786126',
        img_profil: 'usersinata11-ava.jpg',
        createdAt: now,
        updatedAt: now
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('tb_account', null, {})
  }
};