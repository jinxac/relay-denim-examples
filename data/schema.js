import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';


import {
  Denim,
  DenimList,
  getDenims,
  getDenimList,
} from './database'

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    // Log to NodeJS console the mapping from globalId/Node ID
      // to actual object type and id
      console.log("NodeDefinitions (globalId), id:", id);
      console.log("NodeDefinitions (globalId), type:", type);
    if (type === 'DenimList') {
        // Return your list of denims
        // NOTE: we did not utilize id in this simple example
        // but we could have used it to retrieve a specific
        // database object
        return getDenimList();
      } else {
        return null;
    }
  },
  (obj) => {
    if (obj instanceof DenimList) {
          return denimListType;
        } else {
          return null;
    }
  },
);


const denimType = new GraphQLObjectType({
  name:'Denim',
  description: 'A single denim',
  fields : () =>({
    id : globalIdField('Denim'),
    brand : {
      type : GraphQLString,
      description : 'brand of jeans'
    },
    model : {
      type : GraphQLString,
      description : 'type of jeans'
    },
    size: {
      type: GraphQLInt,
      description: 'Size of denim',
    },
  }),
  interfaces: [nodeInterface],
})

const denimListType = new GraphQLObjectType({
  name : 'DenimList',
  description : 'List of denims',
  fields : () => ({
    // id : globalIdField('DenimList'),
    denims : {
      type : denimConnection,
      description :'List of denims',
      args : connectionArgs,
      resolve : (_,args) => connectionFromArray(getDenims(),args)
    }
  }),
  // interfaces : [nodeInterface]
})

const { connectionType : denimConnection} = connectionDefinitions({name:'Denim',nodeType:denimType})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    denimList: {
      type: denimListType,
      resolve:  () => getDenimList()
    },
  }),
});

const Schema = new GraphQLSchema({
  query: queryType
})

module.exports = {
  Schema
}
