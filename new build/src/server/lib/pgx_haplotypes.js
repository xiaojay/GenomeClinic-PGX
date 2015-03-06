/*
 * Sets of pharmacogenomic markers to be uploaded to the DB.
 * These markers have been extracted from PharmGKB documents and manually
 * curated by Ron Ammar and Tara Paton. The list is always growing.
 * This module also contains the marker coordinates, since they may
 * not always be in the annovar annotation DBs.
 *
 * @author Ron Ammar
 */

var pgxGenes= {
    "abcb1": {
        "*1": [
            "rs1128503",
            "rs2032582",
            "rs1045642"
        ],
        "*2 (pmid: 11503014);*13 (pmid: 12893986)": [],
        "*2 (pmid: 12893986)": [
            "rs1128503",
            "rs2032582"
        ]
    },
    "abcg2": {
        "abcg2 34 g>a": [
            "rs2231137"
        ],
        "abcg2 421 c>a": [
            "rs2231142"
        ],
        "reference": []
    },
    "ankk1": {
        "drd2 taq1a": [
            "rs1800497"
        ],
        "reference": []
    },
    "comt": {
        "haplotype high activity": [
            "rs4818"
        ],
        "haplotype intermediate activity": [
            "rs4633",
            "rs4680"
        ],
        "haplotype low activity": []
    },
    "cyp2c19": {
        "*1": [],
        "*17": [
            "rs12248560"
        ],
        "*2": [
            "rs4244285"
        ],
        "*3": [
            "rs4986893"
        ],
        "*4": [
            "rs28399504"
        ],
        "*8": [
            "rs41291556"
        ],
        "*9": [
            "rs17884712"
        ]
    },
    "cyp2c9": {
        "*1": [],
        "*2": [
            "rs1799853"
        ],
        "*3": [
            "rs1057910"
        ],
        "*5": [
            "rs28371686"
        ],
        "*6": [
            "rs9332131"
        ]
    },
    "cyp2d6": {
        "*1": [
            "rs16947",
            "rs1135840"
        ],
        "*10": [
            "rs1065852",
            "rs16947"
        ],
        "*17": [
            "rs28371706"
        ],
        "*2": [],
        "*3": [
            "rs35742686",
            "rs16947",
            "rs1135840"
        ],
        "*4": [
            "rs1065852",
            "rs3892097",
            "rs16947"
        ],
        "*41": [
            "rs28371725"
        ],
        "*5": [
            "rs5030655",
            "rs35742686",
            "rs5030656"
        ],
        "*6": [
            "rs5030655",
            "rs16947",
            "rs1135840"
        ],
        "*9": [
            "rs5030656",
            "rs16947",
            "rs1135840"
        ]
    },
    "cyp3a5": {
        "cyp3a5*3": [
            "rs776746"
        ],
        "reference": []
    },
    "cyp4f2": {
        "*1": [],
        "*3": [
            "rs2108622"
        ]
    },
    "dpyd": {
        "*1": [],
        "*2a": [
            "rs3918290"
        ],
        "rs67376798": [
            "rs67376798"
        ]
    },
    "grik4": {
        "reference": [],
        "rs1954787": [
            "rs1954787"
        ]
    },
    "hla-a": {
        "hla-a*31:01": [
            "rs1061235"
        ],
        "reference": []
    },
    "hla-b": {
        "hla-b*15:02 a": [
            "rs3909184"
        ],
        "hla-b*15:02 b": [
            "rs2844682"
        ],
        "hla-b*57:01": [
            "rs2395029"
        ],
        "reference": []
    },
    "ifnl3": {
        "reference": [],
        "rs12979860": [
            "rs12979860"
        ]
    },
    "mthfr": {
        "1298c": [
            "rs1801131"
        ],
        "677t": [
            "rs1801133"
        ],
        "reference": []
    },
    "slc19a1": {
        "reference": [],
        "rs1051266": [
            "rs1051266"
        ]
    },
    "slco1b1": {
        "*1": [],
        "*1b": [
            "rs2306283"
        ],
        "*5": [
            "rs4149056"
        ]
    },
    "tmem": {
        "reference": [],
        "xpc lys939gln": [
            "rs2228001"
        ]
    },
    "tpmt": {
        "*1": [],
        "*2": [
            "rs1800462"
        ],
        "*3a": [
            "rs1142345",
            "rs1800460"
        ],
        "*3b": [
            "rs1800460"
        ],
        "*3c": [
            "rs1142345"
        ],
        "*4": [
            "rs1800584"
        ]
    },
    "vkorc1": {
        "*1": [],
        "*2": [
            "rs9923231"
        ]
    }
};

var pgxCoordinates= {
    "rs1045642": {
        "alt": [
            "g",
            "t"
        ],
        "chr": "7",
        "pos": 87138645,
        "ref": "a"
    },
    "rs1051266": {
        "alt": [
            "c"
        ],
        "chr": "21",
        "pos": 46957794,
        "ref": "t"
    },
    "rs1057910": {
        "alt": [
            "c"
        ],
        "chr": "10",
        "pos": 96741053,
        "ref": "a"
    },
    "rs1061235": {
        "alt": [
            "t"
        ],
        "chr": "6",
        "pos": 29913298,
        "ref": "a"
    },
    "rs1065852": {
        "alt": [
            "a"
        ],
        "chr": "22",
        "pos": 42526694,
        "ref": "g"
    },
    "rs1128503": {
        "alt": [
            "g"
        ],
        "chr": "7",
        "pos": 87179601,
        "ref": "a"
    },
    "rs1135840": {
        "alt": [
            "c"
        ],
        "chr": "22",
        "pos": 42522613,
        "ref": "g"
    },
    "rs1142345": {
        "alt": [
            "c"
        ],
        "chr": "6",
        "pos": 18130918,
        "ref": "t"
    },
    "rs12248560": {
        "alt": [
            "a",
            "t"
        ],
        "chr": "10",
        "pos": 96521657,
        "ref": "c"
    },
    "rs12979860": {
        "alt": [
            "t"
        ],
        "chr": "19",
        "pos": 39738787,
        "ref": "c"
    },
    "rs16947": {
        "alt": [
            "g"
        ],
        "chr": "22",
        "pos": 42523943,
        "ref": "a"
    },
    "rs17884712": {
        "alt": [
            "a"
        ],
        "chr": "10",
        "pos": 96535246,
        "ref": "g"
    },
    "rs1799853": {
        "alt": [
            "t"
        ],
        "chr": "10",
        "pos": 96702047,
        "ref": "c"
    },
    "rs1800460": {
        "alt": [
            "t"
        ],
        "chr": "6",
        "pos": 18139228,
        "ref": "c"
    },
    "rs1800462": {
        "alt": [
            "g"
        ],
        "chr": "6",
        "pos": 18143955,
        "ref": "c"
    },
    "rs1800497": {
        "alt": [
            "a"
        ],
        "chr": "11",
        "pos": 113270828,
        "ref": "g"
    },
    "rs1800584": {
        "alt": [
            "t"
        ],
        "chr": "6",
        "pos": 18131012,
        "ref": "c"
    },
    "rs1801131": {
        "alt": [
            "g"
        ],
        "chr": "1",
        "pos": 11854476,
        "ref": "t"
    },
    "rs1801133": {
        "alt": [
            "a"
        ],
        "chr": "1",
        "pos": 11856378,
        "ref": "g"
    },
    "rs1954787": {
        "alt": [
            "c"
        ],
        "chr": "11",
        "pos": 120663363,
        "ref": "t"
    },
    "rs2032582": {
        "alt": [
            "c",
            "t"
        ],
        "chr": "7",
        "pos": 87160618,
        "ref": "a"
    },
    "rs2108622": {
        "alt": [
            "t"
        ],
        "chr": "19",
        "pos": 15990431,
        "ref": "c"
    },
    "rs2228001": {
        "alt": [
            "t"
        ],
        "chr": "3",
        "pos": 14187449,
        "ref": "g"
    },
    "rs2231137": {
        "alt": [
            "t"
        ],
        "chr": "4",
        "pos": 89061114,
        "ref": "c"
    },
    "rs2231142": {
        "alt": [
            "t"
        ],
        "chr": "4",
        "pos": 89052323,
        "ref": "g"
    },
    "rs2306283": {
        "alt": [
            "g"
        ],
        "chr": "12",
        "pos": 21329738,
        "ref": "a"
    },
    "rs2395029": {
        "alt": [
            "g"
        ],
        "chr": "6",
        "pos": 31431780,
        "ref": "t"
    },
    "rs28371686": {
        "alt": [
            "g"
        ],
        "chr": "10",
        "pos": 96741058,
        "ref": "c"
    },
    "rs28371706": {
        "alt": [
            "a"
        ],
        "chr": "22",
        "pos": 42525772,
        "ref": "g"
    },
    "rs28371725": {
        "alt": [
            "t"
        ],
        "chr": "22",
        "pos": 42523805,
        "ref": "c"
    },
    "rs28399504": {
        "alt": [
            "g"
        ],
        "chr": "10",
        "pos": 96522463,
        "ref": "a"
    },
    "rs2844682": {
        "alt": [
            "a"
        ],
        "chr": "6",
        "pos": 30946148,
        "ref": "g"
    },
    "rs35742686": {
        "alt": [
            "-"
        ],
        "chr": "22",
        "pos": 42524244,
        "ref": "t"
    },
    "rs3892097": {
        "alt": [
            "t"
        ],
        "chr": "22",
        "pos": 42524947,
        "ref": "c"
    },
    "rs3909184": {
        "alt": [
            "c"
        ],
        "chr": "6",
        "pos": 30699384,
        "ref": "g"
    },
    "rs3918290": {
        "alt": [
            "t"
        ],
        "chr": "1",
        "pos": 97915614,
        "ref": "c"
    },
    "rs41291556": {
        "alt": [
            "c"
        ],
        "chr": "10",
        "pos": 96535173,
        "ref": "t"
    },
    "rs4149056": {
        "alt": [
            "c"
        ],
        "chr": "12",
        "pos": 21331549,
        "ref": "t"
    },
    "rs4244285": {
        "alt": [
            "a",
            "c"
        ],
        "chr": "10",
        "pos": 96541616,
        "ref": "g"
    },
    "rs4633": {
        "alt": [
            "t"
        ],
        "chr": "22",
        "pos": 19950235,
        "ref": "c"
    },
    "rs4680": {
        "alt": [
            "a"
        ],
        "chr": "22",
        "pos": 19951271,
        "ref": "g"
    },
    "rs4818": {
        "alt": [
            "g",
            "t"
        ],
        "chr": "22",
        "pos": 19951207,
        "ref": "c"
    },
    "rs4986893": {
        "alt": [
            "a"
        ],
        "chr": "10",
        "pos": 96540410,
        "ref": "g"
    },
    "rs5030655": {
        "alt": [
            "-"
        ],
        "chr": "22",
        "pos": 42525086,
        "ref": "a"
    },
    "rs5030656": {
        "alt": [
            "-"
        ],
        "chr": "22",
        "pos": 42524176,
        "ref": "ctt"
    },
    "rs67376798": {
        "alt": [
            "a"
        ],
        "chr": "1",
        "pos": 97547947,
        "ref": "t"
    },
    "rs776746": {
        "alt": [
            "t"
        ],
        "chr": "7",
        "pos": 99270539,
        "ref": "c"
    },
    "rs9332131": {
        "alt": [
            "-"
        ],
        "chr": "10",
        "pos": 96709039,
        "ref": "a"
    },
    "rs9923231": {
        "alt": [
            "a",
            "g",
            "t"
        ],
        "chr": "16",
        "pos": 31107689,
        "ref": "c"
    }
};


exports.pgxGenes= pgxGenes;
exports.pgxCoordinates= pgxCoordinates;