// Manual Terrain Test Script
// Paste this into your browser console after selecting GMC CADILLAC > TERRAIN

console.log('=== MANUAL TERRAIN TEST ===');

// Step 1: Check if field 137 exists
console.log('\n1. Checking field 137 existence:');
var field137 = $('#field_3_137');
console.log('Field 137 exists:', field137.length > 0);
console.log('Field 137 visible:', field137.is(':visible'));
console.log('Field 137 HTML:', field137.html());

// Step 2: Check if placeholder exists
if (field137.length > 0) {
    var hasPlaceholder = field137.html().indexOf('{terrain feature checkboxes}') !== -1;
    console.log('Contains placeholder:', hasPlaceholder);
    
    if (hasPlaceholder) {
        console.log('✓ Field 137 found with placeholder');
    } else {
        console.log('✗ Field 137 found but no placeholder');
    }
} else {
    console.log('✗ Field 137 not found');
}

// Step 3: Check variables
console.log('\n2. Checking variables:');
console.log('formId:', typeof formId !== 'undefined' ? formId : 'UNDEFINED');
console.log('terrainHtmlBlockFieldId:', typeof terrainHtmlBlockFieldId !== 'undefined' ? terrainHtmlBlockFieldId : 'UNDEFINED');
console.log('terrainPopulated:', typeof terrainPopulated !== 'undefined' ? terrainPopulated : 'UNDEFINED');

// Step 4: Try manual population
console.log('\n3. Trying manual population:');
if (typeof populateTerrainFeatures === 'function') {
    console.log('Calling populateTerrainFeatures...');
    
    // Reset the flag
    if (typeof terrainPopulated !== 'undefined') {
        terrainPopulated = false;
    }
    
    populateTerrainFeatures();
    
    // Check result
    setTimeout(function() {
        console.log('\n4. Post-population check:');
        var checkboxes = field137.find('input[type="checkbox"]');
        console.log('Checkboxes created:', checkboxes.length);
        console.log('Updated HTML preview:', field137.html().substring(0, 300));
        
        if (checkboxes.length > 0) {
            console.log('✓ SUCCESS: Checkboxes created!');
        } else {
            console.log('✗ FAILED: No checkboxes created');
        }
    }, 1000);
} else {
    console.log('✗ populateTerrainFeatures function not found');
}

console.log('\n=== TEST COMPLETE ===');