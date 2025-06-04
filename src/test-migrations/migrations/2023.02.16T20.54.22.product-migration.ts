import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('products', {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    purchasePrice: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    stock: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    salesPrice: {
      type: DataTypes.NUMBER,
      allowNull: true
    }
  })
  await sequelize.getQueryInterface().createTable("clients", {
    id: {
        type: "varchar(255)",
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: "varchar(255)",
        allowNull: false
    },
    email: {
        type: "varchar(255)",
        allowNull: false
    },
    document: {
        type: "varchar(255)",
        allowNull: false
    },
    street: {
        type: "varchar(255)",
        allowNull: false
    },
    number: {
        type: "varchar(255)",
        allowNull: false
    },
    complement: {
        type: "varchar(255)",
        allowNull: false
    },
    city: {
        type: "varchar(255)",
        allowNull: false
    },
    state: {
        type: "varchar(255)",
        allowNull: false
    },
    zipcode: {
        type: "varchar(255)",
        allowNull: false
    },
    createdAt: {
        type: "datetime",
        allowNull: false
    },
    updatedAt: {
        type: "datetime",
        allowNull: false
    }
  })
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('products')
} 
