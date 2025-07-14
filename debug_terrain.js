// Debug script to test GMC model radio button detection
console.log('=== GMC Terrain Debug Script ===');

// Test the radio button detection logic
var formId = 3;
var gmcModelFieldId = 107;

// Check if field exists
var gmcModelField = $('#field_' + formId + '_' + gmcModelFieldId);
console.log('GMC Model Field (ID: 107) exists:', gmcModelField.length > 0);

if (gmcModelField.length) {
    // Find all radio buttons in the field
    var radioButtons = gmcModelField.find('input[type="radio"]');
    console.log('Radio buttons found:', radioButtons.length);
    
    radioButtons.each(function(index) {
        var $radio = $(this);
        console.log('Radio button ' + index + ':', {
            id: $radio.attr('id'),
            name: $radio.attr('name'),
            value: $radio.val(),
            checked: $radio.is(':checked')
        });
    });
    
    // Test TERRAIN radio button specifically
    var terrainRadio = gmcModelField.find('input[type="radio"][value="TERRAIN"]');
    console.log('TERRAIN radio button found:', terrainRadio.length > 0);
    
    if (terrainRadio.length) {
        console.log('TERRAIN radio button details:', {
            id: terrainRadio.attr('id'),
            name: terrainRadio.attr('name'),
            value: terrainRadio.val(),
            checked: terrainRadio.is(':checked')
        });
    }
    
    // Test the name detection logic
    radioButtons.each(function() {
        var $radio = $(this);
        var name = $radio.attr('name');
        var hasCorrectName = name && name.indexOf('input_' + gmcModelFieldId) !== -1;
        console.log('Radio button name check:', {
            name: name,
            expectedPattern: 'input_' + gmcModelFieldId,
            matches: hasCorrectName
        });
    });
}

// Test field 137 (HTML block)
var terrainHtmlBlockFieldId = 137;
var htmlBlock = $('#field_' + formId + '_' + terrainHtmlBlockFieldId);
console.log('HTML Block Field (ID: 137) exists:', htmlBlock.length > 0);

if (htmlBlock.length) {
    console.log('HTML Block content preview:', htmlBlock.html().substring(0, 200) + '...');
    
    // Check for placeholder
    var hasPlaceholder = htmlBlock.html().indexOf('{terrain feature checkboxes}') !== -1;
    console.log('Has terrain feature checkboxes placeholder:', hasPlaceholder);
}

// Test field 69 (trim levels)
var htmlBlockFieldId = 69;
var trimBlock = $('#field_' + formId + '_' + htmlBlockFieldId);
console.log('Trim Levels Field (ID: 69) exists:', trimBlock.length > 0);

if (trimBlock.length) {
    console.log('Trim Levels content preview:', trimBlock.html().substring(0, 200) + '...');
    
    // Check for placeholder
    var hasPlaceholder = trimBlock.html().indexOf('{TRIM LEVELS}') !== -1;
    console.log('Has TRIM LEVELS placeholder:', hasPlaceholder);
}

console.log('=== End Debug Script ===');