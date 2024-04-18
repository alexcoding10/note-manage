import { DataTypes, Model} from "sequelize";
import sequelize from "../mysqlDB";
import User  from "./User";

class Note extends Model {}

//Definir el modelo de Note
Note.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
  label: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "actived",
    validate:{
        customValidator (value){
            if(value!="actived" && value!="inactived"){
                throw new Error('Status must be actived or inactived')
            }
        }
    }
  },
  createAt : {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  modelName: "Note",
});

Note.belongsToMany(User, { through: "noteUser" });

Note.sync();
export default Note;