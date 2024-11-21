/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solana_stablecoin.json`.
 */
export type SolanaStablecoin = {
  "address": "7gFZNhBQidDAqbzqbuFFzetrnordQLLpibV8hX5S2taU",
  "metadata": {
    "name": "solanaStablecoin",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addSupportedBond",
      "discriminator": [
        115,
        247,
        7,
        200,
        84,
        34,
        95,
        123
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true
        },
        {
          "name": "factoryState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "bondMint"
        },
        {
          "name": "bondInfo"
        },
        {
          "name": "paymentFeedInfo"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "minCreationAmount",
          "type": "u64"
        },
        {
          "name": "minRedemptionAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "burnTokens",
      "discriminator": [
        76,
        15,
        51,
        254,
        229,
        215,
        121,
        66
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "stablecoinState",
          "writable": true
        },
        {
          "name": "factoryState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "userState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "stablecoin_state.mint",
                "account": "stablecoinState"
              }
            ]
          }
        },
        {
          "name": "userBondAccount",
          "docs": [
            "User's stablebond token account to receive bonds"
          ],
          "writable": true
        },
        {
          "name": "userStablecoinAccount",
          "docs": [
            "User's stablecoin token account to burn from",
            "User's stablecoin token account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userState"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "stablecoinMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "stablecoinMint",
          "docs": [
            "The stablecoin mint"
          ],
          "writable": true
        },
        {
          "name": "collateralVault",
          "docs": [
            "Collateral vault"
          ],
          "writable": true
        },
        {
          "name": "solFeeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  102,
                  101,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "kycInfo"
        },
        {
          "name": "oracle"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "stablecoinAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createStablecoin",
      "discriminator": [
        100,
        62,
        131,
        196,
        204,
        102,
        67,
        185
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "factoryState",
          "docs": [
            "Factory state PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "stablecoinState",
          "docs": [
            "Stablecoin state PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  98,
                  108,
                  101,
                  99,
                  111,
                  105,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              },
              {
                "kind": "arg",
                "path": "symbol"
              }
            ]
          }
        },
        {
          "name": "creatorState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "mint",
          "docs": [
            "The mint for the stablecoin"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "yieldMint",
          "docs": [
            "Yield mint"
          ],
          "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        },
        {
          "name": "collateralVault",
          "docs": [
            "Collateral vault for stablebonds"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "stablecoinState"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "bondMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "bondMint",
          "docs": [
            "The stablebond mint we're using as collateral"
          ]
        },
        {
          "name": "bondInfo"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "targetCurrency",
          "type": "string"
        }
      ]
    },
    {
      "name": "distributeYield",
      "discriminator": [
        233,
        92,
        186,
        157,
        235,
        238,
        212,
        114
      ],
      "accounts": [
        {
          "name": "distributor",
          "writable": true,
          "signer": true
        },
        {
          "name": "factoryState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "stablecoinState",
          "writable": true
        },
        {
          "name": "userState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user_state.user",
                "account": "userState"
              },
              {
                "kind": "account",
                "path": "stablecoin_state.mint",
                "account": "stablecoinState"
              }
            ]
          }
        },
        {
          "name": "oracle",
          "docs": [
            "Bond oracle for price feed"
          ]
        },
        {
          "name": "bondInfo"
        },
        {
          "name": "bondMint",
          "docs": [
            "The bond mint"
          ]
        },
        {
          "name": "usdcFeeVault",
          "docs": [
            "Protocol fee vault"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "factoryState"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "yieldMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "yieldMint",
          "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        },
        {
          "name": "userYieldAccount",
          "docs": [
            "User's yield token account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userState"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "yieldMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeFactory",
      "discriminator": [
        179,
        64,
        75,
        250,
        39,
        254,
        240,
        178
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "The admin who will have authority over the factory",
            "This account must be a signer as they're establishing control of the protocol"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "factoryState",
          "docs": [
            "The factory state PDA that stores all protocol configurations",
            "Seeds: [\"factory_state\"]",
            "This account is initialized here and will store all factory-wide parameters"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "feeMint",
          "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        },
        {
          "name": "solFeeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  102,
                  101,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "feeVault",
          "docs": [
            "The fee collection ATA, owned by factory PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "factoryState"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "feeMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "minCollateralRatio",
          "type": "u16"
        },
        {
          "name": "baseFeeRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "mintTokens",
      "discriminator": [
        59,
        132,
        24,
        246,
        122,
        39,
        8,
        243
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "stablecoinState",
          "writable": true
        },
        {
          "name": "factoryState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "userState",
          "docs": [
            "User's state PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "stablecoinMint"
              }
            ]
          }
        },
        {
          "name": "userBondAccount",
          "docs": [
            "User's stablebond token account"
          ],
          "writable": true
        },
        {
          "name": "userStablecoinAccount",
          "docs": [
            "User's stablecoin token account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userState"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "stablecoinMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "stablecoinMint",
          "docs": [
            "The stablecoin mint"
          ],
          "writable": true
        },
        {
          "name": "collateralVault",
          "docs": [
            "Collateral vault"
          ],
          "writable": true
        },
        {
          "name": "solFeeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  102,
                  101,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "kycInfo"
        },
        {
          "name": "oracle"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "bondAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "pauseStablecoin",
      "discriminator": [
        62,
        192,
        45,
        175,
        83,
        8,
        239,
        205
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "factoryState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "stablecoinState",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "removeBond",
      "discriminator": [
        114,
        224,
        192,
        27,
        21,
        166,
        109,
        180
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true
        },
        {
          "name": "factoryState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "bondMint"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "resumeStablecoin",
      "discriminator": [
        30,
        112,
        215,
        210,
        74,
        139,
        152,
        158
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "factoryState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "stablecoinState",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "updateBondConfig",
      "discriminator": [
        238,
        194,
        17,
        158,
        231,
        167,
        83,
        205
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true
        },
        {
          "name": "factoryState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "bondMint"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "updates",
          "type": {
            "defined": {
              "name": "bondConfigUpdate"
            }
          }
        }
      ]
    },
    {
      "name": "updateFactoryConfig",
      "discriminator": [
        219,
        46,
        19,
        240,
        1,
        37,
        160,
        26
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "The current admin who must sign to authorize changes"
          ],
          "signer": true
        },
        {
          "name": "newAdmin",
          "docs": [
            "Optional new admin if admin transfer is requested"
          ],
          "optional": true
        },
        {
          "name": "factoryState",
          "docs": [
            "The factory state PDA containing configuration"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "feeMint",
          "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        },
        {
          "name": "feeVault",
          "docs": [
            "The fee collection ATA, owned by factory PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "factoryState"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "feeMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "newCollector",
          "docs": [
            "Optional new collector to add"
          ],
          "optional": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "newMinCollateralRatio",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "newBaseFeeRate",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "newFeeRecipient",
          "type": {
            "option": "pubkey"
          }
        }
      ]
    },
    {
      "name": "updateStablecoin",
      "discriminator": [
        128,
        52,
        56,
        136,
        69,
        36,
        60,
        218
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "factoryState",
          "docs": [
            "Factory state PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "stablecoinState",
          "docs": [
            "Stablecoin state PDA that we want to update"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  98,
                  108,
                  101,
                  99,
                  111,
                  105,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "stablecoin_state.creator",
                "account": "stablecoinState"
              },
              {
                "kind": "account",
                "path": "stablecoin_state.original_symbol",
                "account": "stablecoinState"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "symbol",
          "type": {
            "option": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "aggregatorAccountData",
      "discriminator": [
        217,
        230,
        65,
        101,
        201,
        162,
        27,
        125
      ]
    },
    {
      "name": "factoryState",
      "discriminator": [
        91,
        157,
        184,
        99,
        123,
        112,
        102,
        7
      ]
    },
    {
      "name": "solFeeVault",
      "discriminator": [
        243,
        105,
        179,
        83,
        19,
        67,
        221,
        86
      ]
    },
    {
      "name": "stablecoinState",
      "discriminator": [
        107,
        33,
        134,
        54,
        129,
        13,
        187,
        151
      ]
    },
    {
      "name": "userState",
      "discriminator": [
        72,
        177,
        85,
        249,
        76,
        167,
        186,
        126
      ]
    }
  ],
  "events": [
    {
      "name": "bondAdded",
      "discriminator": [
        49,
        199,
        208,
        217,
        88,
        186,
        82,
        183
      ]
    },
    {
      "name": "bondConfigUpdated",
      "discriminator": [
        34,
        200,
        124,
        24,
        147,
        133,
        175,
        79
      ]
    },
    {
      "name": "bondRemoved",
      "discriminator": [
        177,
        200,
        116,
        123,
        1,
        244,
        161,
        240
      ]
    },
    {
      "name": "factoryConfigUpdated",
      "discriminator": [
        215,
        69,
        11,
        1,
        99,
        165,
        45,
        30
      ]
    },
    {
      "name": "factoryInitialized",
      "discriminator": [
        20,
        86,
        103,
        75,
        20,
        220,
        162,
        63
      ]
    },
    {
      "name": "stablecoinBurned",
      "discriminator": [
        235,
        15,
        32,
        126,
        86,
        185,
        36,
        7
      ]
    },
    {
      "name": "stablecoinCreated",
      "discriminator": [
        15,
        73,
        199,
        47,
        148,
        215,
        195,
        9
      ]
    },
    {
      "name": "stablecoinMinted",
      "discriminator": [
        78,
        169,
        253,
        17,
        186,
        58,
        17,
        168
      ]
    },
    {
      "name": "stablecoinPaused",
      "discriminator": [
        72,
        123,
        16,
        187,
        50,
        214,
        82,
        198
      ]
    },
    {
      "name": "stablecoinResumed",
      "discriminator": [
        235,
        143,
        126,
        98,
        196,
        165,
        218,
        200
      ]
    },
    {
      "name": "stablecoinUpdated",
      "discriminator": [
        48,
        198,
        137,
        67,
        200,
        121,
        26,
        85
      ]
    },
    {
      "name": "yieldCollected",
      "discriminator": [
        79,
        119,
        129,
        72,
        118,
        91,
        54,
        42
      ]
    },
    {
      "name": "yieldDistributed",
      "discriminator": [
        107,
        100,
        4,
        71,
        95,
        176,
        248,
        94
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidCollateralRatio",
      "msg": "Invalid collateral ratio specified"
    },
    {
      "code": 6001,
      "name": "collateralRatioTooLow",
      "msg": "Collateral ratio below minimum required"
    },
    {
      "code": 6002,
      "name": "invalidUsdcMint",
      "msg": "The USDC Mint is incorrect"
    },
    {
      "code": 6003,
      "name": "invalidFeeRate",
      "msg": "Invalid fee rate specified"
    },
    {
      "code": 6004,
      "name": "factoryAlreadyInitialized",
      "msg": "Factory is already initialized"
    },
    {
      "code": 6005,
      "name": "factoryPaused",
      "msg": "Factory is currently paused"
    },
    {
      "code": 6006,
      "name": "invalidAdminAuthority",
      "msg": "Invalid admin authority"
    },
    {
      "code": 6007,
      "name": "exceedsMaximumValue",
      "msg": "Operation exceeds maximum allowed value"
    },
    {
      "code": 6008,
      "name": "unauthorized",
      "msg": "Unauthorized access"
    },
    {
      "code": 6009,
      "name": "invalidNameLength",
      "msg": "Invalid stablecoin name length"
    },
    {
      "code": 6010,
      "name": "invalidPayoutAccount",
      "msg": "Invalid payout account"
    },
    {
      "code": 6011,
      "name": "noCollateralToCollectFrom",
      "msg": "No collateral to collect from"
    },
    {
      "code": 6012,
      "name": "payoutDeserializationError",
      "msg": "Failed to deserialize payout"
    },
    {
      "code": 6013,
      "name": "yieldCollectionTooFrequent",
      "msg": "Yield collect is too frequent"
    },
    {
      "code": 6014,
      "name": "invalidSymbolLength",
      "msg": "Invalid stablecoin symbol length"
    },
    {
      "code": 6015,
      "name": "staleError",
      "msg": "Does not meet requirements"
    },
    {
      "code": 6016,
      "name": "alreadyPaused",
      "msg": "Stablecoin is already paused"
    },
    {
      "code": 6017,
      "name": "notPaused",
      "msg": "Stablecoin is not paused"
    },
    {
      "code": 6018,
      "name": "bondMintMismatch",
      "msg": "Bond mint mismatch"
    },
    {
      "code": 6019,
      "name": "rebaseTooEarly",
      "msg": "Rebase is too early"
    },
    {
      "code": 6020,
      "name": "maxStablecoinsReached",
      "msg": "Maximum number of stablecoins reached"
    },
    {
      "code": 6021,
      "name": "invalidOracleConfig",
      "msg": "Invalid oracle configuration"
    },
    {
      "code": 6022,
      "name": "staleOraclePrice",
      "msg": "Oracle price is too stale"
    },
    {
      "code": 6023,
      "name": "invalidOraclePrice",
      "msg": "Oracle price is not valid"
    },
    {
      "code": 6024,
      "name": "lowOracleConfidence",
      "msg": "Oracle confidence is too low"
    },
    {
      "code": 6025,
      "name": "invalidTargetCurrency",
      "msg": "Invalid target currency"
    },
    {
      "code": 6026,
      "name": "insufficientCollateral",
      "msg": "Insufficient collateral provided"
    },
    {
      "code": 6027,
      "name": "invalidSymbolFormat",
      "msg": "Invalid symbol format"
    },
    {
      "code": 6028,
      "name": "collateralRatioTooHigh",
      "msg": "Collateral ratio exceeds maximum allowed"
    },
    {
      "code": 6029,
      "name": "bumpNotFound",
      "msg": "PDA bump not found"
    },
    {
      "code": 6030,
      "name": "mathOverflow",
      "msg": "Math overflow occurred"
    },
    {
      "code": 6031,
      "name": "invalidOracleStaleness",
      "msg": "Invalid oracle staleness configuration"
    },
    {
      "code": 6032,
      "name": "invalidOracleConfidence",
      "msg": "Invalid oracle confidence interval"
    },
    {
      "code": 6033,
      "name": "invalidOracleUpdateCount",
      "msg": "Invalid oracle update count"
    },
    {
      "code": 6034,
      "name": "invalidPriceDeviation",
      "msg": "Invalid price deviation threshold"
    },
    {
      "code": 6035,
      "name": "insufficientOracleUpdates",
      "msg": "Insufficient oracle updates"
    },
    {
      "code": 6036,
      "name": "excessivePriceDeviation",
      "msg": "Price deviation exceeds maximum allowed"
    },
    {
      "code": 6037,
      "name": "invalidKycAccount",
      "msg": "Invalid KYC account"
    },
    {
      "code": 6038,
      "name": "feeTooLarge",
      "msg": "Fee is too large"
    },
    {
      "code": 6039,
      "name": "tooManyUsers",
      "msg": "Maximum amount of users reached"
    },
    {
      "code": 6040,
      "name": "divideByZero",
      "msg": "Dividing by zero is not allowed"
    },
    {
      "code": 6041,
      "name": "invalidTimestamp",
      "msg": "The timestamp is invalid"
    },
    {
      "code": 6042,
      "name": "missingOracleAccount",
      "msg": "No oracle account identified"
    },
    {
      "code": 6043,
      "name": "insufficientStablecoinBalance",
      "msg": "Not enough stablecoins"
    },
    {
      "code": 6044,
      "name": "stablecoinPaused",
      "msg": "Stablecoin paused"
    },
    {
      "code": 6045,
      "name": "redeemAmountTooSmall",
      "msg": "Redeem amount is too small"
    },
    {
      "code": 6046,
      "name": "insufficientUserShare",
      "msg": "User has insufficient share"
    },
    {
      "code": 6047,
      "name": "userShareNotFound",
      "msg": "TUser share was not found"
    },
    {
      "code": 6048,
      "name": "invalidMintAmount",
      "msg": "Invalid mint amount"
    },
    {
      "code": 6049,
      "name": "invalidPrice",
      "msg": "Invalid price"
    },
    {
      "code": 6050,
      "name": "noYieldToDistribute",
      "msg": "No yield to distribute"
    },
    {
      "code": 6051,
      "name": "noUserPosition",
      "msg": "No user position"
    },
    {
      "code": 6052,
      "name": "noTotalSupply",
      "msg": "No total supply"
    },
    {
      "code": 6053,
      "name": "excessiveSlippage",
      "msg": "Excessive slippage"
    },
    {
      "code": 6054,
      "name": "supplyCapExceeded",
      "msg": "Supply cap exceeded"
    },
    {
      "code": 6055,
      "name": "unsupportedBond",
      "msg": "Bond is not supported"
    },
    {
      "code": 6056,
      "name": "unauthorizedAdmin",
      "msg": "Only admin can perform this action"
    },
    {
      "code": 6057,
      "name": "unauthorizedAccess",
      "msg": "Only authority can perform this action"
    },
    {
      "code": 6058,
      "name": "tooManyBonds",
      "msg": "Maximum number of supported bonds reached"
    },
    {
      "code": 6059,
      "name": "invalidTokenAccountOwner",
      "msg": "Not the owner of token account"
    },
    {
      "code": 6060,
      "name": "invalidBondMint",
      "msg": "Bond is invalid"
    },
    {
      "code": 6061,
      "name": "bondAlreadyExists",
      "msg": "Bond is already supported"
    },
    {
      "code": 6062,
      "name": "collectorAlreadyExists",
      "msg": "Yield collector already exists"
    },
    {
      "code": 6063,
      "name": "maxCollectorsReached",
      "msg": "Yield collectors has reached limit"
    },
    {
      "code": 6064,
      "name": "invalidBondAccount",
      "msg": "Invalid bond account"
    },
    {
      "code": 6065,
      "name": "invalidPaymentFeed",
      "msg": "Invalid payment feed"
    },
    {
      "code": 6066,
      "name": "bondDisabled",
      "msg": "Bond is currently disabled"
    },
    {
      "code": 6067,
      "name": "activeCollateralExists",
      "msg": "Bond has active collateral and cannot be removed"
    },
    {
      "code": 6068,
      "name": "bondNotFound",
      "msg": "Bond not found"
    },
    {
      "code": 6069,
      "name": "depositTooSmall",
      "msg": "Deposit amount below minimum required"
    },
    {
      "code": 6070,
      "name": "invalidName",
      "msg": "Name is invalid"
    },
    {
      "code": 6071,
      "name": "invalidSymbol",
      "msg": "Symbol is invalid"
    }
  ],
  "types": [
    {
      "name": "aggregatorAccountData",
      "serialization": "bytemuckunsafe",
      "repr": {
        "kind": "rust",
        "packed": true
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "docs": [
              "Name of the aggregator to store on-chain."
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "metadata",
            "docs": [
              "Metadata of the aggregator to store on-chain."
            ],
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          },
          {
            "name": "reserved1",
            "docs": [
              "Reserved."
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "queuePubkey",
            "docs": [
              "Pubkey of the queue the aggregator belongs to."
            ],
            "type": "pubkey"
          },
          {
            "name": "oracleRequestBatchSize",
            "docs": [
              "CONFIGS",
              "Number of oracles assigned to an update request."
            ],
            "type": "u32"
          },
          {
            "name": "minOracleResults",
            "docs": [
              "Minimum number of oracle responses required before a round is validated."
            ],
            "type": "u32"
          },
          {
            "name": "minJobResults",
            "docs": [
              "Minimum number of job results before an oracle accepts a result."
            ],
            "type": "u32"
          },
          {
            "name": "minUpdateDelaySeconds",
            "docs": [
              "Minimum number of seconds required between aggregator rounds."
            ],
            "type": "u32"
          },
          {
            "name": "startAfter",
            "docs": [
              "Unix timestamp for which no feed update will occur before."
            ],
            "type": "i64"
          },
          {
            "name": "varianceThreshold",
            "docs": [
              "Change percentage required between a previous round and the current round. If variance percentage is not met, reject new oracle responses."
            ],
            "type": {
              "defined": {
                "name": "switchboardDecimal"
              }
            }
          },
          {
            "name": "forceReportPeriod",
            "docs": [
              "Number of seconds for which, even if the variance threshold is not passed, accept new responses from oracles."
            ],
            "type": "i64"
          },
          {
            "name": "expiration",
            "docs": [
              "Timestamp when the feed is no longer needed."
            ],
            "type": "i64"
          },
          {
            "name": "consecutiveFailureCount",
            "docs": [
              "Counter for the number of consecutive failures before a feed is removed from a queue. If set to 0, failed feeds will remain on the queue."
            ],
            "type": "u64"
          },
          {
            "name": "nextAllowedUpdateTime",
            "docs": [
              "Timestamp when the next update request will be available."
            ],
            "type": "i64"
          },
          {
            "name": "isLocked",
            "docs": [
              "Flag for whether an aggregators configuration is locked for editing."
            ],
            "type": "bool"
          },
          {
            "name": "crankPubkey",
            "docs": [
              "Optional, public key of the crank the aggregator is currently using. Event based feeds do not need a crank."
            ],
            "type": "pubkey"
          },
          {
            "name": "latestConfirmedRound",
            "docs": [
              "Latest confirmed update request result that has been accepted as valid."
            ],
            "type": {
              "defined": {
                "name": "aggregatorRound"
              }
            }
          },
          {
            "name": "currentRound",
            "docs": [
              "Oracle results from the current round of update request that has not been accepted as valid yet."
            ],
            "type": {
              "defined": {
                "name": "aggregatorRound"
              }
            }
          },
          {
            "name": "jobPubkeysData",
            "docs": [
              "List of public keys containing the job definitions for how data is sourced off-chain by oracles."
            ],
            "type": {
              "array": [
                "pubkey",
                16
              ]
            }
          },
          {
            "name": "jobHashes",
            "docs": [
              "Used to protect against malicious RPC nodes providing incorrect task definitions to oracles before fulfillment."
            ],
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "hash"
                  }
                },
                16
              ]
            }
          },
          {
            "name": "jobPubkeysSize",
            "docs": [
              "Number of jobs assigned to an oracle."
            ],
            "type": "u32"
          },
          {
            "name": "jobsChecksum",
            "docs": [
              "Used to protect against malicious RPC nodes providing incorrect task definitions to oracles before fulfillment."
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "authority",
            "docs": [
              "The account delegated as the authority for making account changes."
            ],
            "type": "pubkey"
          },
          {
            "name": "historyBuffer",
            "docs": [
              "Optional, public key of a history buffer account storing the last N accepted results and their timestamps."
            ],
            "type": "pubkey"
          },
          {
            "name": "previousConfirmedRoundResult",
            "docs": [
              "The previous confirmed round result."
            ],
            "type": {
              "defined": {
                "name": "switchboardDecimal"
              }
            }
          },
          {
            "name": "previousConfirmedRoundSlot",
            "docs": [
              "The slot when the previous confirmed round was opened."
            ],
            "type": "u64"
          },
          {
            "name": "disableCrank",
            "docs": [
              "Whether an aggregator is permitted to join a crank."
            ],
            "type": "bool"
          },
          {
            "name": "jobWeights",
            "docs": [
              "Job weights used for the weighted median of the aggregator's assigned job accounts."
            ],
            "type": {
              "array": [
                "u8",
                16
              ]
            }
          },
          {
            "name": "creationTimestamp",
            "docs": [
              "Unix timestamp when the feed was created."
            ],
            "type": "i64"
          },
          {
            "name": "resolutionMode",
            "docs": [
              "Use sliding window or round based resolution",
              "NOTE: This changes result propogation in latest_round_result"
            ],
            "type": {
              "defined": {
                "name": "aggregatorResolutionMode"
              }
            }
          },
          {
            "name": "basePriorityFee",
            "type": "u32"
          },
          {
            "name": "priorityFeeBump",
            "type": "u32"
          },
          {
            "name": "priorityFeeBumpPeriod",
            "type": "u32"
          },
          {
            "name": "maxPriorityFeeMultiplier",
            "type": "u32"
          },
          {
            "name": "parentFunction",
            "type": "pubkey"
          },
          {
            "name": "ebuf",
            "docs": [
              "Reserved for future info."
            ],
            "type": {
              "array": [
                "u8",
                90
              ]
            }
          }
        ]
      }
    },
    {
      "name": "aggregatorResolutionMode",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "modeRoundResolution"
          },
          {
            "name": "modeSlidingResolution"
          }
        ]
      }
    },
    {
      "name": "aggregatorRound",
      "serialization": "bytemuckunsafe",
      "repr": {
        "kind": "rust",
        "packed": true
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "numSuccess",
            "docs": [
              "Maintains the number of successful responses received from nodes.",
              "Nodes can submit one successful response per round."
            ],
            "type": "u32"
          },
          {
            "name": "numError",
            "docs": [
              "Number of error responses."
            ],
            "type": "u32"
          },
          {
            "name": "isClosed",
            "docs": [
              "Whether an update request round has ended."
            ],
            "type": "bool"
          },
          {
            "name": "roundOpenSlot",
            "docs": [
              "Maintains the `solana_program::clock::Slot` that the round was opened at."
            ],
            "type": "u64"
          },
          {
            "name": "roundOpenTimestamp",
            "docs": [
              "Maintains the `solana_program::clock::UnixTimestamp;` the round was opened at."
            ],
            "type": "i64"
          },
          {
            "name": "result",
            "docs": [
              "Maintains the current median of all successful round responses."
            ],
            "type": {
              "defined": {
                "name": "switchboardDecimal"
              }
            }
          },
          {
            "name": "stdDeviation",
            "docs": [
              "Standard deviation of the accepted results in the round."
            ],
            "type": {
              "defined": {
                "name": "switchboardDecimal"
              }
            }
          },
          {
            "name": "minResponse",
            "docs": [
              "Maintains the minimum node response this round."
            ],
            "type": {
              "defined": {
                "name": "switchboardDecimal"
              }
            }
          },
          {
            "name": "maxResponse",
            "docs": [
              "Maintains the maximum node response this round."
            ],
            "type": {
              "defined": {
                "name": "switchboardDecimal"
              }
            }
          },
          {
            "name": "oraclePubkeysData",
            "docs": [
              "Pubkeys of the oracles fulfilling this round."
            ],
            "type": {
              "array": [
                "pubkey",
                16
              ]
            }
          },
          {
            "name": "mediansData",
            "docs": [
              "Represents all successful node responses this round. `NaN` if empty."
            ],
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "switchboardDecimal"
                  }
                },
                16
              ]
            }
          },
          {
            "name": "currentPayout",
            "docs": [
              "Current rewards/slashes oracles have received this round."
            ],
            "type": {
              "array": [
                "i64",
                16
              ]
            }
          },
          {
            "name": "mediansFulfilled",
            "docs": [
              "Keep track of which responses are fulfilled here."
            ],
            "type": {
              "array": [
                "bool",
                16
              ]
            }
          },
          {
            "name": "errorsFulfilled",
            "docs": [
              "Keeps track of which errors are fulfilled here."
            ],
            "type": {
              "array": [
                "bool",
                16
              ]
            }
          }
        ]
      }
    },
    {
      "name": "bondAdded",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bondMint",
            "type": "pubkey"
          },
          {
            "name": "paymentMint",
            "type": "pubkey"
          },
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "bondCollateralInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bondMint",
            "type": "pubkey"
          },
          {
            "name": "totalCollateral",
            "type": "u64"
          },
          {
            "name": "numStablecoins",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "bondConfigUpdate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isEnabled",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "customFeeRate",
            "type": {
              "option": {
                "option": "u16"
              }
            }
          }
        ]
      }
    },
    {
      "name": "bondConfigUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bondMint",
            "type": "pubkey"
          },
          {
            "name": "isEnabled",
            "type": "bool"
          },
          {
            "name": "customFeeRate",
            "type": {
              "option": "u16"
            }
          },
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "bondRemoved",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bondMint",
            "type": "pubkey"
          },
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "factoryConfigUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "feeVault",
            "type": "pubkey"
          },
          {
            "name": "minCollateralRatio",
            "type": "u16"
          },
          {
            "name": "baseFeeRate",
            "type": "u16"
          },
          {
            "name": "protocolVersion",
            "type": "u16"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "factoryInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "feeVault",
            "type": "pubkey"
          },
          {
            "name": "minCollateralRatio",
            "type": "u16"
          },
          {
            "name": "baseFeeRate",
            "type": "u16"
          },
          {
            "name": "protocolVersion",
            "type": "u16"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "factoryState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "feeVault",
            "type": "pubkey"
          },
          {
            "name": "isPaused",
            "type": "bool"
          },
          {
            "name": "minCollateralRatio",
            "type": "u16"
          },
          {
            "name": "baseFeeRate",
            "type": "u16"
          },
          {
            "name": "stablecoinCount",
            "type": "u32"
          },
          {
            "name": "lastUpdate",
            "type": "i64"
          },
          {
            "name": "allowedBondConfigs",
            "type": {
              "vec": {
                "defined": {
                  "name": "stablebondConfig"
                }
              }
            }
          },
          {
            "name": "bondCollateralTracking",
            "type": {
              "vec": {
                "defined": {
                  "name": "bondCollateralInfo"
                }
              }
            }
          },
          {
            "name": "authorizedCollectors",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "protocolVersion",
            "type": "u16"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "hash",
      "serialization": "bytemuckunsafe",
      "repr": {
        "kind": "rust",
        "packed": true
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "data",
            "docs": [
              "The bytes used to derive the hash."
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "solFeeVault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalFeesCollected",
            "type": "u64"
          },
          {
            "name": "lastCollection",
            "type": "i64"
          },
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "stablebondConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bondMint",
            "type": "pubkey"
          },
          {
            "name": "paymentMint",
            "type": "pubkey"
          },
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "minCreationAmount",
            "type": "u64"
          },
          {
            "name": "minRedemptionAmount",
            "type": "u64"
          },
          {
            "name": "isEnabled",
            "type": "bool"
          },
          {
            "name": "customFeeRate",
            "type": {
              "option": "u16"
            }
          }
        ]
      }
    },
    {
      "name": "stablecoinBurned",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "bondAmount",
            "type": "u64"
          },
          {
            "name": "stablecoinAmount",
            "type": "u64"
          },
          {
            "name": "bondPrice",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "stablecoinCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "bondMint",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "targetCurrency",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "stablecoinMinted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "bondAmount",
            "type": "u64"
          },
          {
            "name": "mintAmount",
            "type": "u64"
          },
          {
            "name": "bondPrice",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "stablecoinPaused",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "stablecoin",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "stablecoinResumed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "stablecoin",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "stablecoinState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "originalSymbol",
            "type": "string"
          },
          {
            "name": "targetCurrency",
            "type": "string"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "lastUpdated",
            "type": "i64"
          },
          {
            "name": "userShares",
            "type": {
              "vec": {
                "defined": {
                  "name": "userShare"
                }
              }
            }
          },
          {
            "name": "stablebondMint",
            "type": "pubkey"
          },
          {
            "name": "collateralVault",
            "type": "pubkey"
          },
          {
            "name": "collateralRatio",
            "type": "u16"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "totalCollateral",
            "type": "u64"
          },
          {
            "name": "lastRebase",
            "type": "i64"
          },
          {
            "name": "totalRebaseAmount",
            "type": "u64"
          },
          {
            "name": "lastYieldCollection",
            "type": "i64"
          },
          {
            "name": "lastRateUpdate",
            "type": "i64"
          },
          {
            "name": "yieldMint",
            "type": "pubkey"
          },
          {
            "name": "totalYieldCollected",
            "type": "u64"
          },
          {
            "name": "bondMint",
            "type": "pubkey"
          },
          {
            "name": "fiatOracle",
            "type": "pubkey"
          },
          {
            "name": "lastPriceUpdate",
            "type": "i64"
          },
          {
            "name": "isPaused",
            "type": "bool"
          },
          {
            "name": "feeRate",
            "type": "u16"
          },
          {
            "name": "lastFeeCollection",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "stablecoinUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "symbol",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "switchboardDecimal",
      "serialization": "bytemuckunsafe",
      "repr": {
        "kind": "rust",
        "packed": true
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mantissa",
            "docs": [
              "The part of a floating-point number that represents the significant digits of that number, and that is multiplied by the base, 10, raised to the power of scale to give the actual value of the number."
            ],
            "type": "i128"
          },
          {
            "name": "scale",
            "docs": [
              "The number of decimal places to move to the left to yield the actual value."
            ],
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "userShare",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "bondAmount",
            "type": "u64"
          },
          {
            "name": "mintAmount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "userState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "stablecoin",
            "type": "pubkey"
          },
          {
            "name": "totalYieldCollected",
            "type": "u64"
          },
          {
            "name": "lastYieldCollection",
            "type": "i64"
          },
          {
            "name": "bondAmount",
            "type": "u64"
          },
          {
            "name": "stablecoinAmount",
            "type": "u64"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "yieldCollected",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collector",
            "type": "pubkey"
          },
          {
            "name": "stablecoin",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "yieldDistributed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "stablecoin",
            "type": "pubkey"
          },
          {
            "name": "protocolFee",
            "type": "u64"
          },
          {
            "name": "userYield",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
