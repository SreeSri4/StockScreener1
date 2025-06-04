// TradingView API payloads for different screener types

export const screenerPayloads = {
  "52-week-high": {
    "columns": [
      "name",
      "description",
      "close",
      "change",
      "volume",
      "relative_volume_10d_calc",
      "market_cap_basic",
      "sector"
    ],
    "filter": [
      {
        "left": "country",
        "operation": "in_range",
        "right": ["India"]
      },
      {
        "left": "close",
        "operation": "egreater",
        "right": 30
      },
      {
        "left": "exchange",
        "operation": "in_range",
        "right": ["NSE"]
      },
      {
        "left": "average_volume_60d_calc",
        "operation": "greater",
        "right": 100000
      },
      {
        "left": "price_52_week_high",
        "operation": "eless",
        "right": "high"
      },
      {
        "left": "market_cap_basic",
        "operation": "egreater",
        "right": 8000000000
      },
      {
        "left": "is_primary",
        "operation": "equal",
        "right": true
      }
    ],
    "ignore_unknown_fields": false,
    "options": {
      "lang": "en"
    },
    "range": [0, 100],
    "sort": {
      "sortBy": "market_cap_basic",
      "sortOrder": "desc"
    },
    "symbols": {},
    "markets": ["india"],
    "filter2": {
      "operator": "and",
      "operands": [
        {
          "operation": {
            "operator": "or",
            "operands": [
              {
                "operation": {
                  "operator": "and",
                  "operands": [
                    {
                      "expression": {
                        "left": "type",
                        "operation": "equal",
                        "right": "stock"
                      }
                    },
                    {
                      "expression": {
                        "left": "typespecs",
                        "operation": "has",
                        "right": ["common"]
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          "operation": {
            "operator": "or",
            "operands": [
              {
                "operation": {
                  "operator": "and",
                  "operands": [
                    {
                      "expression": {
                        "left": "type",
                        "operation": "equal",
                        "right": "stock"
                      }
                    },
                    {
                      "expression": {
                        "left": "typespecs",
                        "operation": "has",
                        "right": ["common"]
                      }
                    }
                  ]
                }
              },
              {
                "operation": {
                  "operator": "and",
                  "operands": [
                    {
                      "expression": {
                        "left": "type",
                        "operation": "equal",
                        "right": "stock"
                      }
                    },
                    {
                      "expression": {
                        "left": "typespecs",
                        "operation": "has",
                        "right": ["preferred"]
                      }
                    }
                  ]
                }
              },
              {
                "operation": {
                  "operator": "and",
                  "operands": [
                    {
                      "expression": {
                        "left": "type",
                        "operation": "equal",
                        "right": "dr"
                      }
                    }
                  ]
                }
              },
              {
                "operation": {
                  "operator": "and",
                  "operands": [
                    {
                      "expression": {
                        "left": "type",
                        "operation": "equal",
                        "right": "fund"
                      }
                    },
                    {
                      "expression": {
                        "left": "typespecs",
                        "operation": "has_none_of",
                        "right": ["etf"]
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  },

  "volume-buzzers": {
    "columns": [
      "name",
      "description", 
      "close",
      "change",
      "volume",
      "relative_volume_10d_calc",
      "market_cap_basic",
      "sector"
    ],
    "filter": [
      {
        "left": "country",
        "operation": "in_range",
        "right": ["India"]
      },
      {
        "left": "close",
        "operation": "egreater",
        "right": 30
      },
      {
        "left": "exchange",
        "operation": "in_range",
        "right": ["NSE"]
      },
      {
        "left": "relative_volume_10d_calc",
        "operation": "egreater",
        "right": 1.5
      },
      {
        "left": "volume",
        "operation": "egreater",
        "right": 500000
      },
      {
        "left": "market_cap_basic",
        "operation": "egreater",
        "right": 1000000000
      },
      {
        "left": "is_primary",
        "operation": "equal",
        "right": true
      }
    ],
    "ignore_unknown_fields": false,
    "options": {
      "lang": "en"
    },
    "range": [0, 100],
    "sort": {
      "sortBy": "relative_volume_10d_calc",
      "sortOrder": "desc"
    },
    "symbols": {},
    "markets": ["india"],
    "filter2": {
      "operator": "and",
      "operands": [
        {
          "operation": {
            "operator": "or",
            "operands": [
              {
                "operation": {
                  "operator": "and",
                  "operands": [
                    {
                      "expression": {
                        "left": "type",
                        "operation": "equal",
                        "right": "stock"
                      }
                    },
                    {
                      "expression": {
                        "left": "typespecs",
                        "operation": "has",
                        "right": ["common"]
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  },

  "1-month-high": {
    "columns": [
      "name",
      "description",
      "close", 
      "change",
      "volume",
      "relative_volume_10d_calc",
      "market_cap_basic",
      "sector"
    ],
    "filter": [
      {
        "left": "country",
        "operation": "in_range",
        "right": ["India"]
      },
      {
        "left": "close",
        "operation": "egreater",
        "right": 30
      },
      {
        "left": "exchange",
        "operation": "in_range",
        "right": ["NSE"]
      },
      {
        "left": "price_1_month_high",
        "operation": "eless",
        "right": "high"
      },
      {
        "left": "average_volume_60d_calc",
        "operation": "greater",
        "right": 100000
      },
      {
        "left": "market_cap_basic",
        "operation": "egreater",
        "right": 5000000000
      },
      {
        "left": "is_primary",
        "operation": "equal",
        "right": true
      }
    ],
    "ignore_unknown_fields": false,
    "options": {
      "lang": "en"
    },
    "range": [0, 100],
    "sort": {
      "sortBy": "market_cap_basic",
      "sortOrder": "desc"
    },
    "symbols": {},
    "markets": ["india"],
    "filter2": {
      "operator": "and",
      "operands": [
        {
          "operation": {
            "operator": "or",
            "operands": [
              {
                "operation": {
                  "operator": "and",
                  "operands": [
                    {
                      "expression": {
                        "left": "type",
                        "operation": "equal",
                        "right": "stock"
                      }
                    },
                    {
                      "expression": {
                        "left": "typespecs",
                        "operation": "has",
                        "right": ["common"]
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  },

  "100-percent-up": {
    "columns": [
      "name",
      "description",
      "close",
      "change", 
      "volume",
      "relative_volume_10d_calc",
      "market_cap_basic",
      "sector"
    ],
    "filter": [
      {
        "left": "country",
        "operation": "in_range",
        "right": ["India"]
      },
      {
        "left": "close",
        "operation": "egreater",
        "right": 30
      },
      {
        "left": "exchange",
        "operation": "in_range",
        "right": ["NSE"]
      },
      {
        "left": "Perf.Y",
        "operation": "egreater",
        "right": 100
      },
      {
        "left": "average_volume_60d_calc",
        "operation": "greater",
        "right": 50000
      },
      {
        "left": "market_cap_basic",
        "operation": "egreater",
        "right": 2000000000
      },
      {
        "left": "is_primary",
        "operation": "equal",
        "right": true
      }
    ],
    "ignore_unknown_fields": false,
    "options": {
      "lang": "en"
    },
    "range": [0, 100],
    "sort": {
      "sortBy": "Perf.Y",
      "sortOrder": "desc"
    },
    "symbols": {},
    "markets": ["india"],
    "filter2": {
      "operator": "and",
      "operands": [
        {
          "operation": {
            "operator": "or",
            "operands": [
              {
                "operation": {
                  "operator": "and",
                  "operands": [
                    {
                      "expression": {
                        "left": "type",
                        "operation": "equal",
                        "right": "stock"
                      }
                    },
                    {
                      "expression": {
                        "left": "typespecs",
                        "operation": "has",
                        "right": ["common"]
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  }
};