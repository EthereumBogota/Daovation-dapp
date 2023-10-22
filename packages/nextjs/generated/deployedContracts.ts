const contracts = {
  80001: [
    {
      chainId: "80001",
      name: "Polygon Mumbai",
      contracts: {
        AppDaoManagement: {
          address: "0x6927beacc64f62DF7Fc86b64D4d5Da379b50c2dD",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_daoAddress",
                  type: "address",
                },
              ],
              name: "getDaoInfo",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "address",
                      name: "daoAddress",
                      type: "address",
                    },
                  ],
                  internalType: "struct AppDaoManagement.DaoInfo",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_daoName",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "_daoAddress",
                  type: "address",
                },
              ],
              name: "registerDao",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        AppEventFactory: {
          address: "0xa89b78B8BA6b9059Db3117A56bB6417078881FdD",
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "numEvents",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "eventId",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "bytes32",
                  name: "hashEventId",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "eventAddr",
                  type: "address",
                },
              ],
              name: "eventCreated",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_daoAddress",
                  type: "address",
                },
                {
                  internalType: "string[]",
                  name: "_eventInfo",
                  type: "string[]",
                },
                {
                  internalType: "uint256[]",
                  name: "_numericData",
                  type: "uint256[]",
                },
              ],
              name: "createEvent",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_daoAddress",
                  type: "address",
                },
              ],
              name: "getDaoInfo",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "address",
                      name: "daoAddress",
                      type: "address",
                    },
                  ],
                  internalType: "struct AppDaoManagement.DaoInfo",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getTimestamp",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "mapAddrEventNum",
              outputs: [
                {
                  internalType: "address",
                  name: "dao",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "eventAddr",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "active",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "eventNum",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "eventId",
                  type: "string",
                },
                {
                  internalType: "bytes32",
                  name: "hashId",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "mapEventsPerDao",
              outputs: [
                {
                  internalType: "address",
                  name: "dao",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "eventAddr",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "active",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "eventNum",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "eventId",
                  type: "string",
                },
                {
                  internalType: "bytes32",
                  name: "hashId",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "mapIdEvent",
              outputs: [
                {
                  internalType: "address",
                  name: "dao",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "eventAddr",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "active",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "eventNum",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "eventId",
                  type: "string",
                },
                {
                  internalType: "bytes32",
                  name: "hashId",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "mapNumEvent",
              outputs: [
                {
                  internalType: "address",
                  name: "dao",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "eventAddr",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "active",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "eventNum",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "eventId",
                  type: "string",
                },
                {
                  internalType: "bytes32",
                  name: "hashId",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "numEvents",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_daoName",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "_daoAddress",
                  type: "address",
                },
              ],
              name: "registerDao",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
