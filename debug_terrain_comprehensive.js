// Comprehensive Terrain Debug Script
// Paste this into your browser console after selecting GMC CADILLAC > TERRAIN

console.log('=== COMPREHENSIVE TERRAIN DEBUG ===');

// 1. Check form variables
console.log('1. Form Variables:');
console.log('formId:', typeof formId !== 'undefined' ? formId : 'UNDEFINED');
console.log('terrainHtmlBlockFieldId:', typeof terrainHtmlBlockFieldId !== 'undefined' ? terrainHtmlBlockFieldId : 'UNDEFINED');
console.log('terrainPopulated:', typeof terrainPopulated !== 'undefined' ? terrainPopulated : 'UNDEFINED');

// 2. Check model configuration
console.log('\n2. Model Configuration:');
console.log('modelConfigs:', typeof modelConfigs !== 'undefined' ? modelConfigs : 'UNDEFINED');
console.log('modelConfigs.TERRAIN:', typeof modelConfigs !== 'undefined' && modelConfigs.TERRAIN ? modelConfigs.TERRAIN : 'UNDEFINED');

// 3. Find all fields with ID containing 137
console.log('\n3. All Fields with ID containing 137:');
var fields137 = $('[id*="137"]');
console.log('Found ' + fields137.length + ' elements with ID containing 137:');
fields137.each(function(i) {
    console.log('  ' + i + ': ' + this.id + ' (tag: ' + this.tagName + ', class: ' + $(this).attr('class') + ')');
});

// 4. Try different selectors for the HTML block
console.log('\n4. Testing HTML Block Selectors:');
var selectors = [
    '#field_3_137',
    '#input_3_137',
    '#field_' + (typeof formId !== 'undefined' ? formId : '3') + '_137',
    '#input_' + (typeof formId !== 'undefined' ? formId : '3') + '_137'
];

var htmlBlock = null;
selectors.forEach(function(selector, index) {
    var elements = $(selector);
    console.log('  Selector ' + index + ' (' + selector + '): ' + elements.length + ' elements');
    if (elements.length > 0 && !htmlBlock) {
        htmlBlock = elements.first();
        console.log('    Using this selector for htmlBlock');
    }
});

// 5. Check HTML block content
console.log('\n5. HTML Block Analysis:');
if (htmlBlock && htmlBlock.length > 0) {
    console.log('HTML Block found:', htmlBlock.attr('id'));
    console.log('Visible:', htmlBlock.is(':visible'));
    console.log('Content length:', htmlBlock.html().length);
    console.log('Content preview:', htmlBlock.html().substring(0, 200));
    console.log('Contains placeholder:', htmlBlock.html().indexOf('{terrain feature checkboxes}') !== -1);
    
    // Check for existing checkboxes
    var existingCheckboxes = htmlBlock.find('input[type="checkbox"]');
    console.log('Existing checkboxes:', existingCheckboxes.length);
    existingCheckboxes.each(function(i) {
        console.log('  Checkbox ' + i + ':', {
            id: $(this).attr('id'),
            name: $(this).attr('name'),
            value: $(this).attr('value'),
            checked: $(this).is(':checked')
        });
    });
} else {
    console.log('HTML Block not found!');
}

// 6. Test CSV fetch
console.log('\n6. Testing CSV Fetch:');
if (typeof modelConfigs !== 'undefined' && modelConfigs.TERRAIN) {
    var csvUrl = modelConfigs.TERRAIN.csvUrl;
    console.log('CSV URL:', csvUrl);
    
    fetch(csvUrl)
        .then(response => response.text())
        .then(csvText => {
            console.log('CSV fetched successfully, length:', csvText.length);
            console.log('CSV preview:', csvText.substring(0, 300));
        })
        .catch(error => {
            console.error('CSV fetch failed:', error);
        });
} else {
    console.log('Model configuration not available');
}

// 7. Force populate features
console.log('\n7. Force Populating Features:');
if (typeof forcePopulateTerrainFeatures === 'function') {
    forcePopulateTerrainFeatures();
} else if (typeof populateTerrainFeatures === 'function') {
    console.log('Calling populateTerrainFeatures directly...');
    if (typeof terrainPopulated !== 'undefined') {
        terrainPopulated = false;
    }
    populateTerrainFeatures();
} else {
    console.log('populateTerrainFeatures function not found');
}

// 8. Final check
setTimeout(function() {
    console.log('\n8. Final Check (after 2 seconds):');
    if (htmlBlock && htmlBlock.length > 0) {
        var finalCheckboxes = htmlBlock.find('input[type="checkbox"]');
        console.log('Final checkboxes count:', finalCheckboxes.length);
        console.log('Final HTML content preview:', htmlBlock.html().substring(0, 300));
        
        if (finalCheckboxes.length > 0) {
            console.log('SUCCESS: Checkboxes created!');
            console.log('Try selecting some checkboxes and see if trim levels update');
        } else {
            console.log('ISSUE: No checkboxes found after population');
        }
    }
}, 2000);

console.log('\n=== DEBUG COMPLETE ===');