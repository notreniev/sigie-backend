import * as Sequelize from 'sequelize'

export interface DBConnection {
    sequelize: Sequelize.Sequelize
}