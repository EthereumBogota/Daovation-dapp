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
      },
    },
  ],
} as const;

export default contracts;
