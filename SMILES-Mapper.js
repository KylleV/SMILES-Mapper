//////////////////////////////////////////////////
//////////////// User Interface //////////////////
//////////////////////////////////////////////////




function collapsible (evt) {
    // Modified from W3Schools.com Tutorial 

    evt.currentTarget.classList.toggle("active");
    var content = evt.currentTarget.nextElementSibling;
    if (content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }    
}


function openPage(evt, pagename, btn_class, page_class, displaystyle) {
    // Modified from W3Schools.com Tutorial 


    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName(page_class);
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName(btn_class);
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(pagename).style.display = displaystyle;
    evt.currentTarget.className += " active";
}





//////////////////////////////////////////////////
//////////////// Helper Function /////////////////
//////////////////////////////////////////////////


// Is Charecter Alphabet
function isAlphabetic(char) {
    return /^[A-Za-z]$/.test(char);
}

// Create smarts string for ring of size n+2 of a given symbol
function createRingString(n, typ = "a"){
    let string = typ + "1"
    for (let i = 0; i < n; i++) {
        string += typ;
    }
    string += typ;
    string += "1";
    return string;
}

// Creates smarts string for chain of length a+1 for a given symbol
function createAliphString(n, typ = "A"){
    let string = typ;
    for (let i = 0; i < n; i++) {
        string += typ;
    }
    return string;
}

// Get the color from a color-scheme
function generateColor(index, totalPositions, colors) {

    // A color scheme is defined in colorss, as a list of different colors to cycle through,
    // will provide a color based on the total number of colors needed (totalPositions), and 
    // the position needed (index)

    const segment = totalPositions / (colors.length - 1);
    const segmentIndex = Math.floor(index / segment);
    const startColor = colors[segmentIndex];
    const endColor = colors[segmentIndex + 1];

    const ratio = (index % segment) / segment;

    const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * ratio);
    const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * ratio);
    const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * ratio);

    return [r/255,g/255,b/255];
}

// Converts Hex Color to Numerical Colors
function hexToNumeric(hex) {

    if (hex.startsWith('#')) {
        hex = hex.substring(1);
    }

    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    return [ r, g, b ];
}

// Converts Numerical Colors to Hex Color Strintg
function numericToHex(arr) {
    const componentToHex = (component) => {
        const hex = Math.round(component * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    const red = componentToHex(arr[0]);
    const green = componentToHex(arr[1]);
    const blue = componentToHex(arr[2]);

    return `#${red}${green}${blue}`;
}


// Finds line idx which starts with a given substring
function findLineWithWithStart(text, text_val) {
    const lines = text.split('\n');

    let lineIndex = -1;
    lines.forEach((line, index) => {

        if (line.includes(text_val)) {
            lineIndex = index;
        return;
        }
    });

    return lineIndex;
}
//////////////////////////////////////////////////
/////////////// General Settings /////////////////
//////////////////////////////////////////////////


// Color Palette for RDKitJS 
const colpal = {
    6 : [0.9,0.9,0.9],
    7 : [0.2,0.2,0.9],
    8 : [0.9,0.2,0.2]
};

// Color Scheme For Atom "Types"
// Divided into Aromatic, Aliphatic ring
// and Aliphatic Chain 
const col_typ = {"Aromatic"       :    [[47, 87, 93], [101, 139,  11]],
                "Aliphatic Ring"  :    [[47, 49, 93], [102, 101, 139]],
                "Aliphatic Chain" :    [[93, 47, 47], [139, 101, 101]],
                "Other"           :    [[92, 47, 90], [123, 83,  124]],
            }



// Input Parameters
var orgsmil = "";               // Original Input
var inpmol = "";                // Input Molecule
var img_selection_empty = "";   // Molecule Image When no Selection
var img_selection_atom = [];    // Molecule Image for Each Atom Selection

// List of Two-Letter Symbols to Replace With J for Indexing
var repl = ["Li","Be","He","Ne","Na","Mg","Al","Si","Cl","Ar","Ca","Sc","Ti","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Es",
            "Br","Kr","Rb","Sr","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","Xe","Cs","Ba","Hf","Ta","Re","Os","Ir",
            "Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts",
            "Og","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu","Ac","Th","Pa","Np","Am","Pu","Cm","Bk","Cf",
            "Fm","Md","No","Lr"]

// Standard Isotope for each element for InCHI
const std_isotope = {
    1 : 1,
    2 : 4,
    3 : 7,
    4 : 9,
    5 : 11,
    6 : 12,
    7 : 14,
    8 : 16,
    9 : 19,
    10 : 20,
    11 : 22,
    12 : 24,
    13 : 27,
    14 : 28,
    15 : 31,
    16 : 32,
    17 : 35,
    18 : 40,
    19 : 39,
    20 : 40,
    21 : 45,
    22 : 48,
    23 : 51,
    24 : 52,
    25 : 55,
    26 : 56,
    27 : 59,
    28 : 59,
    29 : 64,
    30 : 65,
    31 : 70,
    32 : 73,
    33 : 75,
    34 : 79,
    35 : 80,
    36 : 84,
    37 : 85,
    38 : 88,
    39 : 89,
    40 : 91,
    41 : 92,
    42 : 96,
    43 : 97,
    44 : 101,
    45 : 103,
    46 : 106,
    47 : 108,
    48 : 112,
    49 : 115,
    50 : 119,
    51 : 122,
    52 : 128,
    53 : 127,
    54 : 132,
    55 : 133,
    56 : 137,
    57 : 139,
    58 : 140,
    59 : 141,
    60 : 144,
    61 : 145,
    62 : 150,
    63 : 152,
    64 : 157,
    65 : 159,
    66 : 163,
    67 : 165,
    68 : 167,
    69 : 169,
    70 : 173,
    71 : 175,
    72 : 178,
    73 : 181,
    74 : 184,
    75 : 186,
    76 : 190,
    77 : 192,
    78 : 195,
    79 : 196,
    80 : 201,
    81 : 204,
    82 : 207, // Check
    83 : 209,
    84 : 209,
    85 : 210,
    86 : 222,
    87 : 223,
    88 : 226,
    89 : 227,
    90 : 232,
    91 : 231,
    92 : 238,
    93 : 237,
    94 : 244,
    95 : 243,
    96 : 247,
    97 : 247,
    98 : 251,
    99 : 252,
    100 : 257,
    101 : 258,
    102 : 259,
    103 : 266,
    104 : 267,
    105 : 268,
    106 : 269,
    107 : 270,
    108 : 269,
    109 : 278,
    110 : 281,
    111 : 282,
    112 : 285,
    113 : 286,
    114 : 289,
    115 : 290,
    116 : 293,
    117 : 294,
    118 : 294
}


//////////////////////////////////////////////////
////////////////// Chem Utility ////////////////// 
//////////////////////////////////////////////////

function copydefault (json) {
    // Copies default atomic values in Mol JSON into each atom
    var numexpatm = Object.keys(json["molecules"][0]["atoms"]).length;
    for (let j = 0; j < numexpatm; j++) {
        default_atm_vals = Object.keys(json["defaults"]["atom"]);
        for (let i = 0; i < default_atm_vals.length; i++) {
            if (default_atm_vals[i] in json["molecules"][0]["atoms"][j]) {
            } else {
                json["molecules"][0]["atoms"][j][default_atm_vals[i]] = json["defaults"]["atom"][default_atm_vals[i]]
            }
        }
    }
    return json

}


function atom_type (mol) {
    // Function to find either the max aromatic ring an atom is in
    // or the max aliphatic ring an atom it in
    // or the maximum aliphatic chain an atom is in 

    var mol_json = JSON.parse(mol.get_json());  
    var numexpatm = Object.keys(mol_json["molecules"][0]["atoms"]).length;


    var existing_atms = [] ; 
    var atom_type_dict = {} ;
    var max_val = {} ; 

    var cur_sub_id = 0; // Counter for substructure 

    // Find which atoms are in aromatic rings, and so we can color atoms based on 
    // which rings they are located in

    for (let i = 0; i < numexpatm - 2; i++) {
        var arom_smart = createRingString(i,"a"); 
        var arom_qmol = RDKitModule.get_qmol(arom_smart)
        var arom_match = JSON.parse(mol.get_substruct_matches(arom_qmol))

        for (let j = 0; j < arom_match.length; j++) {
            
            var new_substruc = false;

            for (let atm = 0; atm < arom_match[j]["atoms"].length; atm++) {
                
                if (!existing_atms.includes(arom_match[j]["atoms"][atm])) {
                    new_substruc = true;
                    existing_atms.push(arom_match[j]["atoms"][atm]);
                    atom_type_dict[arom_match[j]["atoms"][atm]] = {"Type" : "Aromatic", "SubIdx" : cur_sub_id};
                }
            }
            if (new_substruc == true)  {
                cur_sub_id += 1;
            }
            
        }
    }

    max_val["Aromatic"] = cur_sub_id;


    // Find which atoms are in Alipatic rings, and so we can color atoms based on 
    // which rings they are located in

    cur_sub_id = 0;

    for (let i = 0; i < numexpatm - 2; i++) {

        
        var arom_smart = createRingString(i,"*"); 
        var arom_qmol = RDKitModule.get_qmol(arom_smart)
        var arom_match = JSON.parse(mol.get_substruct_matches(arom_qmol))

        for (let j = 0; j < arom_match.length; j++) {
            
            var new_substruc = false;

            for (let atm = 0; atm < arom_match[j]["atoms"].length; atm++) {
                
                if (!existing_atms.includes(arom_match[j]["atoms"][atm])) {
                    new_substruc = true;
                    existing_atms.push(arom_match[j]["atoms"][atm]);
                    atom_type_dict[arom_match[j]["atoms"][atm]] = {"Type" : "Aliphatic Ring", "SubIdx" : cur_sub_id};
                }
            }
            if (new_substruc == true)  {
                cur_sub_id += 1;
            }
            
        }
    }

    max_val["Aliphatic Ring"] = cur_sub_id ;



    // Find which atoms are in Alipatic rings, and so we can color atoms based on 
    // which rings they are located in

    cur_sub_id = 0;

    for (let i = 0; i < numexpatm ; i++) {
        var arom_smart = createAliphString(existing_atms.length - i); 
        var arom_qmol = RDKitModule.get_qmol(arom_smart)
        var arom_match = JSON.parse(mol.get_substruct_matches(arom_qmol))

        for (let j = 0; j < arom_match.length; j++) {
            
            var new_substruc = false;

            for (let atm = 0; atm < arom_match[j]["atoms"].length; atm++) {
                
                if (!existing_atms.includes(arom_match[j]["atoms"][atm])) {
                    new_substruc = true;
                    existing_atms.push(arom_match[j]["atoms"][atm]);
                    atom_type_dict[arom_match[j]["atoms"][atm]] = {"Type" : "Aliphatic Chain", "SubIdx" : cur_sub_id};
                }
            }
            if (new_substruc == true)  {
                cur_sub_id += 1;
            }
            
        }
    }


    max_val["Aliphatic Chain"] = cur_sub_id ;

    cur_sub_id = 0;

    for (let i = 0; i < numexpatm ; i++) {
        var arom_smart = createAliphString(existing_atms.length - i, typ="*"); 
        var arom_qmol = RDKitModule.get_qmol(arom_smart)
        var arom_match = JSON.parse(mol.get_substruct_matches(arom_qmol))

        for (let j = 0; j < arom_match.length; j++) {
            
            var new_substruc = false;

            for (let atm = 0; atm < arom_match[j]["atoms"].length; atm++) {
                
                if (!existing_atms.includes(arom_match[j]["atoms"][atm])) {
                    new_substruc = true;
                    existing_atms.push(arom_match[j]["atoms"][atm]);
                    atom_type_dict[arom_match[j]["atoms"][atm]] = {"Type" : "Other", "SubIdx" : cur_sub_id};
                }
            }
            if (new_substruc == true)  {
                cur_sub_id += 1;
            }
            
        }
    }


    max_val["Other"] = cur_sub_id ;

    out = { "Maximum Val" : max_val,
            "Atom Type Dict" : atom_type_dict}

    return out


}


//////////////////////////////////////////////////
////////////////// SMILES/InChi ////////////////// 
//////////////////////////////////////////////////


// Get Position of Each Atom in InChi String
function prep_inchi (mol) {

    var mol_json = JSON.parse(mol.get_json()) 
    var defcop = copydefault(mol_json) // Copy with added default values
    var numexpatm = Object.keys(mol_json["molecules"][0]["atoms"]).length; // Num of Atoms

    // Set Isotope of Each Atom Equal to Its ID
    for (let j = 0; j < numexpatm; j++) {
        mol_json["molecules"][0]["atoms"][j]["isotope"] = std_isotope[defcop["molecules"][0]["atoms"][j]["z"]] + j;
    }

    // Re-generate molecules from JSON and get isotope of each item [isotope = atom id]

    var temp_mol = RDKitModule.get_mol(JSON.stringify(mol_json));

    var temp_inchi = temp_mol.get_inchi();

    var isotope_list = temp_inchi.split("/i")[1].split("/")[0].split(",");

    // Get map of position in inchi string and atom id
    var atom_map = {}
    for (let i = 0; i < isotope_list.length; i++) {
        atom_map[parseInt(isotope_list[i].split("+")[0])] = parseInt(isotope_list[i].split("+")[1])
    }

    // Get start position of molecule structure part of inchi

    var temp_inchi = mol.get_inchi().split("/");
    var init_len = temp_inchi[0].length + temp_inchi[1].length + 2

    // Split to seperate each atom from eachother
    var atom_section = temp_inchi[2]
    atom_section = atom_section.replace("c","")
    atom_section = atom_section.replace(/[()]/g, "-");
    atom_section = atom_section.split("-");

    // Get Position of Each Atom in Inchi string
    var pos_atom = {}
    var cur_pos = 1
    for (let j = 0; j < atom_section.length ; j++) {
        ich_atm_id = parseInt(atom_section[j])
        for (let l = 0 ; l < atom_section[j].length; l++) {
            pos_atom[init_len + cur_pos + l] = atom_map[ich_atm_id]
        }
        cur_pos += 1 + atom_section[j].length;
    }

    return pos_atom
}


// Get Position of Each Atom in SMILES String
function prep_smile (smiles) {

    var cur_atm_id = 0
    var addtopos = 0;

    // Replace double letter elements with J 
    var nsmil = smiles
    for (let i  = 0 ; i < repl.length; i++) {
        nsmil = nsmil.replace(new RegExp(repl[i], 'g'), "J")
    }

    var pos_atom = {};
    var atm_pos = {}

    // Find Position of each atoms 
    for (let i = 0; i < nsmil.length; i++) {
        if ((isAlphabetic(nsmil[i])  ) && (nsmil[i] !== "H")) {

            atm_pos[cur_atm_id] = i + addtopos ;
            
            prev_car = smiles[i];
            pos_atom[i + addtopos] = cur_atm_id

            if  ( nsmil[i] == "J" ) {
                pos_atom[i + addtopos + 1] = cur_atm_id
                addtopos += 1;
            }
            cur_atm_id +=1;
        }
    }

    return pos_atom;
}



// Generates colorized, interactive display of SMILES/Inchi Strings
function make_identify_view (smiles, atom_pos, atom_cols, topcon, butcon) {
    const butsmcon = document.getElementById(butcon); // Assuming there is a container element with the id "container"
    const topsmcon = document.getElementById(topcon); // Assuming there is a container element with the id "container"
    var pos_atm = atom_pos;


    for (let i = 0; i < smiles.length; i++) {

        const char = smiles[i];
        const div_char = document.createElement("div");
        div_char.className = "smilecharcon";
        div_char.textContent = char;

        const div_num = document.createElement("div");
        div_num.className = "atmidxcon";
        

        if (pos_atm[i] === undefined) {

            div_char.addEventListener("mouseenter", function() {
                var dest = document.getElementById("section-molview");
                dest.innerHTML = "<div id='drawing'>" + img_selection_empty + "</div>";
            });

            div_num.addEventListener("mouseenter", function() {
                var dest = document.getElementById("section-molview");
                dest.innerHTML = "<div id='drawing'>" + img_selection_empty + "</div>";
            });

        } else {

            div_char.style.backgroundColor = numericToHex(atom_cols[pos_atm[i]]);

            div_char.addEventListener("mouseenter", function() {
                var dest = document.getElementById("section-molview");
                dest.innerHTML = "<div id='drawing'>" + img_selection_atom[pos_atm[i]] + "</div>";
            });

            div_num.addEventListener("mouseenter", function() {
                var dest = document.getElementById("section-molview");
                dest.innerHTML = "<div id='drawing'>" + img_selection_atom[pos_atm[i]] + "</div>";
            });

            div_char.addEventListener("mouseleave", function() {
                var dest = document.getElementById("section-molview");
                dest.innerHTML = "<div id='drawing'>" + img_selection_empty + "</div>";
            });

            div_num.addEventListener("mouseleave", function() {
                var dest = document.getElementById("section-molview");
                dest.innerHTML = "<div id='drawing'>" + img_selection_empty + "</div>";
            });

            div_num.textContent = pos_atm[i];

        }

        butsmcon.appendChild(div_char);
        topsmcon.appendChild(div_num);

    }


}


//////////////////////////////////////////////////
//////////////// Mol V2/3K Files ///////////////// 
//////////////////////////////////////////////////

function show_file (mol, file_text, pos_atm, atom_cols, target_mol_line, target_atom_line) {

    const mol_line_con = document.getElementById(target_mol_line);
    const atm_num_con = document.getElementById(target_atom_line);

    var mol2 = file_text
    var each_lin = mol2.split("\n");

    for (let i = 0; i < each_lin.length; i++) {

        // Content of Each Line of the File 
        const div_line = document.createElement("div");
        div_line.className = "molline";
        div_line.textContent = each_lin[i];

        // Number of Atom
        const div_atm_num = document.createElement("div");
        div_atm_num.className = "atmnum";

        if (pos_atm[i] === undefined) {

            div_atm_num.textContent = " ";

            // Show no Selection if not a line for an atom
            div_line.addEventListener("mouseenter", function() {
                var dest = document.getElementById("section-molview");
                dest.innerHTML = "<div id='drawing'>" + img_selection_empty + "</div>";
            });

            div_atm_num.addEventListener("mouseenter", function() {
                var dest = document.getElementById("section-molview");
                dest.innerHTML = "<div id='drawing'>" + img_selection_empty + "</div>";
            });

        } else {

            // If a line for an atom, color appropriately, and add hover effect

            div_line.style.backgroundColor = numericToHex(atom_cols[pos_atm[i]]);
            div_atm_num.textContent = pos_atm[i];

            div_line.addEventListener("mouseenter", function() {
                var dest = document.getElementById("section-molview");
                dest.innerHTML = "<div id='drawing'>" + img_selection_atom[pos_atm[i]] + "</div>";
            });

            div_line.addEventListener("mouseleave", function() {
                var dest = document.getElementById("section-molview");
                dest.innerHTML = "<div id='drawing'>" + img_selection_empty + "</div>";
            });

            div_atm_num.addEventListener("mouseenter", function() {
                var dest = document.getElementById("section-molview");
                dest.innerHTML = "<div id='drawing'>" + img_selection_atom[pos_atm[i]] + "</div>";
            });

            div_atm_num.addEventListener("mouseleave", function() {
                var dest = document.getElementById("section-molview");
                dest.innerHTML = "<div id='drawing'>" + img_selection_empty + "</div>";
            });

        }

        mol_line_con.appendChild(div_line);
        atm_num_con.appendChild(div_atm_num);

    }


}

//////////////////////////////////////////////////
///////////////// Load Compound ////////////////// 
//////////////////////////////////////////////////

function load_compound () {
    try {
        const input = document.getElementById("smilesinput");
        var smiles = input.value;
        var mol = RDKitModule.get_mol(smiles);



        var containers_to_empty = ["top-smiles-container", "buttom-smiles-container",
                                    "top-inchi-container", "buttom-inchi-container",
                                    "atm_line_con_kek","mol_line_con_kek",
                                    "atm_line_con_arom","mol_line_con_arom",
                                    "atm_line_con_v3","mol_line_con_v3"];
        var containers_to_remove = ["atmidxcon","smilecharcon","atmnum","molline"];

        for (const conemp in containers_to_empty) {
            for (const conrem in containers_to_remove) {

                var parentDiv = document.getElementById(containers_to_empty[conemp]);
                var divsToRemove = parentDiv.getElementsByClassName(containers_to_remove[conrem]);

                while (divsToRemove.length > 0) {
                    divsToRemove[0].parentNode.removeChild(divsToRemove[0]);
                }
            }
        }

        while (divsToRemove.length > 0) {
        divsToRemove[0].parentNode.removeChild(divsToRemove[0]);
        }

        img_selection_empty = "";  
        img_selection_atom = [];   


        orgsmil = smiles;
        inpmol = mol ; 

        atom_type_dict = atom_type(mol)

        atom_cols = {};
        atml = [];
        for (const atmid in atom_type_dict["Atom Type Dict"]) {

            var subid = atom_type_dict["Atom Type Dict"][atmid]["SubIdx"];
            var maxval = atom_type_dict["Maximum Val"][atom_type_dict["Atom Type Dict"][atmid]["Type"]];
            var col = col_typ[atom_type_dict["Atom Type Dict"][atmid]["Type"]];

            atom_cols[atmid] = generateColor(subid,maxval,col );
            atml.push(parseInt(atmid));

        }

        var inchi = mol.get_inchi()
        var inchi_pos = prep_inchi(mol)
        var smiles_pos = prep_smile(smiles)


        make_identify_view(smiles, smiles_pos, atom_cols, "top-smiles-container", "buttom-smiles-container")
        make_identify_view(inchi, inchi_pos, atom_cols, "top-inchi-container", "buttom-inchi-container")


        var mdetails = {};
        mdetails['addAtomIndices'] = true;
        mdetails["atomColourPalette"] = colpal;
        mdetails["annotationColour"] = hexToNumeric("#dbdbdd");
        mdetails["backgroundColour"] = hexToNumeric("#3e3d40");
        mdetails['highlightAtomColors'] = atom_cols
        mdetails["atoms"] = atml;

        var svg = mol.get_svg_with_highlights(JSON.stringify(mdetails));
        img_selection_empty = svg.replace("200px","80vh").replace("250px","100%");

        var dest = document.getElementById("section-molview");
        dest.innerHTML = "<div id='drawing'>" + img_selection_empty + "</div>";

        var mol_json = JSON.parse(mol.get_json()) 
        var numexpatm = Object.keys(mol_json["molecules"][0]["atoms"]).length; // Num of Atoms



        var file_kekule = mol.get_kekule_form();
        var file_arom = mol.get_aromatic_form();
        var file_v3 = mol.get_v3Kmolblock();

        var start_line_v3 = findLineWithWithStart(file_v3,"BEGIN ATOM") + 1


        var pos_v3 = {};
        var pos_mol2 = {};

        for (let i = 0; i < numexpatm; i++) {
            var mdetails = {};
            mdetails['addAtomIndices'] = true;
            mdetails["atomColourPalette"] = colpal;
            mdetails["annotationColour"] = hexToNumeric("#dbdbdd");
            mdetails["backgroundColour"] = hexToNumeric("#3e3d40");
            mdetails["atoms"] = atml;
            
            var copi_atm_col = JSON.parse(JSON.stringify(atom_cols));
            copi_atm_col[i] = hexToNumeric("#ada9b2");

            mdetails['highlightAtomColors'] = copi_atm_col
            
            var svg = mol.get_svg_with_highlights(JSON.stringify(mdetails));
            img_selection_atom.push(svg.replace("200px","80vh").replace("250px","100%"))

            pos_mol2[i+4] = i;
            pos_v3[i + start_line_v3] = i;
        }



        show_file (mol, file_kekule, pos_mol2, atom_cols, "mol_line_con_kek", "atm_line_con_kek");
        show_file (mol, file_arom, pos_mol2, atom_cols, "mol_line_con_arom", "atm_line_con_arom");
        show_file (mol, file_v3, pos_v3, atom_cols, "mol_line_con_v3", "atm_line_con_v3");

        document.getElementById("smile-btn").click();
        document.getElementById("keku-btn").click();
    } catch (error) {
        var dest = document.getElementById("section-molview");
        dest.innerHTML = "<div class='err'>An Error Occured<br>This may be due to an error in the SMILES<br>Otherwise refreshing the browser window may help<br><br>Error : " + error + "  <div>";
    }
}

