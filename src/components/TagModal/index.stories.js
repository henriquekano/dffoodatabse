import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { Text, View } from 'react-native'
import R from 'ramda'
import TagModal from '.'

const characters = [
  {
    id: 116,
    slug: 'ignis',
    released: true,
    profile: {
      fullName: {
        en: 'Ignis',
        jp: 'イグニス'
      },
      va: {
        en: 'Mamoru Miyano',
        jp: '宮野 真守'
      },
      world: 18,
      crystal: 1,
      weaponType: 1,
      traits: {
        elements: [],
        role: [],
        spheres: [
          'C',
          'D',
          'D'
        ]
      },
      description: {
        en: '',
        jp: 'ルシス王家の執事の家系に生まれ\\nノクティスの側付きとしてともに育った\\n冷静沈着な青年。\\n誰よりも近くでノクティスを支えながら\\n自身の研鑽をつづける生真面目な努力家。\\n優れた知性と頭脳の冴えを駆使して\\n旅では参謀の役割を果たす。'
      }
    },
    status: {
      levelCap: 70,
      baseStats: {
        initial: {
          HP: 950,
          iBRV: 180,
          mBRV: 550,
          ATK: 170,
          DEF: 150,
          SPD: 26
        },
        level50: {
          HP: 1959,
          iBRV: 831,
          mBRV: 1005,
          ATK: 310,
          DEF: 274
        },
        levelUp60: {
          HP: 44,
          iBRV: 100,
          mBRV: 100,
          ATK: 10,
          DEF: 11
        },
        levelUp70: {
          HP: 29,
          iBRV: 32,
          mBRV: 32,
          ATK: 8,
          DEF: 13
        }
      },
      awakeningPassives: {
        level50: {
          mBRV: 110,
          HP: 280,
          DEF: 30,
          ATK: 34
        },
        level60: {
          DEF: 100,
          ATK: 100
        },
        level70: {
          iBRV: 120,
          mBRV: 120
        }
      },
      awakeningStats: {
        level50: {
          mBRV: 495,
          HP: 1900,
          DEF: 150,
          ATK: 170
        },
        level60: {
          HP: 440,
          DEF: 210,
          mBRV: 1000,
          ATK: 100
        },
        level70: {
          HP: 290,
          DEF: 130,
          ATK: 80,
          iBRV: 320,
          mBRV: 320
        }
      }
    },
    trueId: 131,
    chapterId: 20,
    icon: 'https://dissidiadb.com/static/img/ignis.838dda1.png'
  },
  {
    id: 115,
    slug: 'eight',
    released: true,
    profile: {
      fullName: {
        en: 'Eight',
        jp: 'エイト'
      },
      va: {
        en: 'Miyu Irino',
        jp: '入野 自由'
      },
      world: 16,
      crystal: 2,
      weaponType: 6,
      traits: {
        elements: [],
        role: [
          'MELEE',
          'ATTACKER'
        ],
        spheres: [
          'A',
          'A',
          'A'
        ]
      },
      description: {
        en: '',
        jp: '魔導院ペリシティリウム朱雀・０組に\\n所属するアギト候補生。命を簡単に奪う\\n武器を嫌い 拳のみで戦う格闘少年。\\n冷静沈着で思慮深く 個性派ぞろいの\\n０組の中では比較的常識人である一方 \\n負けず嫌いの熱血漢でもあり いつも\\nストイックに鍛錬に励んでいる。'
      }
    },
    status: {
      levelCap: 70,
      baseStats: {
        initial: {
          HP: 950,
          iBRV: 170,
          mBRV: 550,
          ATK: 170,
          DEF: 130,
          SPD: 27
        },
        level50: {
          HP: 1959,
          iBRV: 785,
          mBRV: 1005,
          ATK: 310,
          DEF: 237
        },
        levelUp60: {
          HP: 44,
          iBRV: 80,
          mBRV: 100,
          ATK: 10,
          DEF: 8
        },
        levelUp70: {
          HP: 29,
          iBRV: 31,
          mBRV: 32,
          ATK: 8,
          DEF: 12
        }
      },
      awakeningPassives: {
        level50: {
          mBRV: 110,
          HP: 280,
          DEF: 26,
          ATK: 34
        },
        level60: {
          DEF: 70,
          ATK: 100
        },
        level70: {
          iBRV: 110,
          mBRV: 120
        }
      },
      awakeningStats: {
        level50: {
          mBRV: 495,
          HP: 1900,
          DEF: 130,
          ATK: 170
        },
        level60: {
          HP: 440,
          DEF: 150,
          mBRV: 1000,
          ATK: 100
        },
        level70: {
          DEF: 120,
          HP: 290,
          ATK: 80,
          iBRV: 310,
          mBRV: 320
        }
      }
    },
    trueId: 132,
    chapterId: -1,
    icon: 'https://dissidiadb.com/static/img/eight.c0d95d7.png'
  },
  {
    id: 114,
    slug: 'the_emperor',
    released: true,
    profile: {
      fullName: {
        en: 'The Emperor',
        jp: '皇帝'
      },
      va: {
        en: 'Kenyu Horiuchi',
        jp: '堀内 賢雄'
      },
      world: 2,
      crystal: 6,
      weaponType: 4,
      traits: {
        elements: [],
        role: [
          'MAGIC',
          'ATTACKER',
          'DEBUFFER'
        ],
        spheres: [
          'A',
          'E',
          'E'
        ]
      },
      description: {
        en: '',
        jp: '魔力と軍事力による世界征服を企む\\n軍事国家パラメキア帝国の総帥。\\n世界中に魔物を放ったのちに\\n強力な軍隊で各地を襲撃した。\\n一度はフリオニールたちに敗れるも\\n地獄で究極の力を身につけ 再び\\nフリオニールたちの前に立ちふさがった。'
      }
    },
    status: {
      levelCap: 70,
      baseStats: {
        initial: {
          HP: 1100,
          iBRV: 140,
          mBRV: 525,
          ATK: 180,
          DEF: 150,
          SPD: 25
        },
        level50: {
          HP: 2268,
          iBRV: 646,
          mBRV: 960,
          ATK: 329,
          DEF: 274
        },
        levelUp60: {
          HP: 100,
          iBRV: 20,
          mBRV: 82,
          ATK: 10,
          DEF: 11
        },
        levelUp70: {
          HP: 32,
          iBRV: 28,
          mBRV: 31,
          ATK: 8,
          DEF: 13
        }
      },
      awakeningPassives: {
        level50: {
          HP: 340,
          mBRV: 105,
          ATK: 36,
          DEF: 30
        },
        level60: {
          ATK: 100,
          DEF: 100
        },
        level70: {
          iBRV: 80,
          mBRV: 110
        }
      },
      awakeningStats: {
        level50: {
          HP: 2200,
          mBRV: 477,
          ATK: 180,
          DEF: 150
        },
        level60: {
          HP: 1000,
          mBRV: 820,
          ATK: 100,
          DEF: 210
        },
        level70: {
          HP: 320,
          iBRV: 280,
          mBRV: 310,
          ATK: 80,
          DEF: 130
        }
      }
    },
    trueId: 130,
    chapterId: -1,
    icon: 'https://dissidiadb.com/static/img/the_emperor.538cf1b.png'
  },
  {
    id: 113,
    slug: 'kimahri',
    released: true,
    profile: {
      fullName: {
        en: 'Kimahri',
        jp: 'キマリ'
      },
      va: {
        en: 'Katsumi Chō',
        jp: '長 克巳'
      },
      world: 10,
      crystal: 5,
      weaponType: 8,
      traits: {
        elements: [],
        role: [
          'RANGED',
          'ATTACKER',
          'TANK',
          'DEBUFFER'
        ],
        spheres: [
          'B',
          'D',
          'E'
        ]
      },
      description: {
        en: '',
        jp: '頑健な肉体を持つロンゾ族の青年で\\n幼き日よりユウナを守っているガード。\\n魔物の技を覚えて使いこなす。\\nただ実直にユウナを守り\\nユウナの意思を何よりも尊重する。\\n寡黙で心情を量りにくいが 折れたツノは\\n故郷を捨てた過去に深い関わりを持つ。'
      }
    },
    status: {
      levelCap: 70,
      baseStats: {
        initial: {
          HP: 1050,
          iBRV: 150,
          mBRV: 500,
          ATK: 175,
          DEF: 210,
          SPD: 26
        },
        level50: {
          HP: 2165,
          iBRV: 693,
          mBRV: 914,
          ATK: 320,
          DEF: 384
        },
        levelUp60: {
          HP: 82,
          iBRV: 40,
          mBRV: 63,
          ATK: 10,
          DEF: 20
        },
        levelUp70: {
          HP: 31,
          iBRV: 29,
          mBRV: 30,
          ATK: 8,
          DEF: 16
        }
      },
      awakeningPassives: {
        level50: {
          HP: 320,
          mBRV: 100,
          ATK: 35,
          DEF: 42
        },
        level60: {
          ATK: 100,
          DEF: 200
        },
        level70: {
          iBRV: 90,
          mBRV: 100
        }
      },
      awakeningStats: {
        level50: {
          HP: 2100,
          mBRV: 450,
          ATK: 180,
          DEF: 210
        },
        level60: {
          HP: 820,
          mBRV: 630,
          ATK: 100,
          DEF: 400
        },
        level70: {
          HP: 310,
          iBRV: 290,
          mBRV: 300,
          ATK: 80,
          DEF: 160
        }
      }
    },
    trueId: 127,
    chapterId: -1,
    icon: 'https://dissidiadb.com/static/img/kimahri.19968a7.png'
  },
  {
    id: 112,
    slug: 'basch',
    released: true,
    profile: {
      fullName: {
        en: 'Basch',
        jp: 'バッシュ'
      },
      va: {
        en: 'Rikiya Koyama',
        jp: '小山 力也'
      },
      world: 12,
      crystal: 4,
      weaponType: 2,
      traits: {
        elements: [],
        role: [
          'MELEE',
          'ATTACKER',
          'TANK'
        ],
        spheres: [
          'A',
          'B',
          'C'
        ]
      },
      description: {
        en: '',
        jp: 'ダルマスカ王国で国民的人気を誇ってい\\nた将軍。帝国の陰謀により国王暗殺の罪\\nを着せられ囚われていたが ヴァンらに\\n出会い脱獄。己の汚名をすすぐことより\\nも 祖国に平穏をもたらすことを第一に\\n考え王女アーシェや仲間を守り奮闘。\\n信念を貫いた。'
      }
    },
    status: {
      levelCap: 70,
      baseStats: {
        initial: {
          HP: 1100,
          iBRV: 140,
          mBRV: 525,
          ATK: 180,
          DEF: 190,
          SPD: 25
        },
        level50: {
          HP: 2268,
          iBRV: 646,
          mBRV: 960,
          ATK: 329,
          DEF: 347
        },
        levelUp60: {
          HP: 100,
          iBRV: 20,
          mBRV: 82,
          ATK: 10,
          DEF: 17
        },
        levelUp70: {
          HP: 32,
          iBRV: 28,
          mBRV: 31,
          ATK: 8,
          DEF: 15
        }
      },
      awakeningPassives: {
        level50: {
          HP: 340,
          mBRV: 105,
          ATK: 36,
          DEF: 38
        },
        level60: {
          ATK: 100,
          DEF: 160
        },
        level70: {
          iBRV: 80,
          mBRV: 110
        }
      },
      awakeningStats: {
        level50: {
          HP: 2200,
          mBRV: 477,
          ATK: 180,
          DEF: 190
        },
        level60: {
          HP: 1000,
          mBRV: 820,
          ATK: 100,
          DEF: 330
        },
        level70: {
          HP: 320,
          iBRV: 280,
          mBRV: 310,
          ATK: 80,
          DEF: 150
        }
      }
    },
    trueId: 41,
    chapterId: -1,
    icon: 'https://dissidiadb.com/static/img/basch.2fc701e.png'
  },
]

storiesOf('TagModal', module)
  .add('default', () => (
    <TagModal
      filterOpen
      characterRoles={['qwe', 'asd', 'zxc', 'ert']}
      characters={characters}
      onPressRole={console.log}
      onApply={console.log}
      onClose={console.log}
    />
  ))
