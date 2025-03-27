// Retrieve inventory data from localStorage or use an empty array if nothing is stored
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// Function to render the inventory table
function renderInventory(filteredInventory = inventory) {
    const inventoryTable = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    inventoryTable.innerHTML = ''; // Clear existing rows

    filteredInventory.forEach((item, index) => {
        const row = inventoryTable.insertRow();
        row.insertCell(0).innerText = item.name;
        row.insertCell(1).innerText = item.type;
        row.insertCell(2).innerText = item.brand;
        row.insertCell(3).innerText = item.quantity;
        row.insertCell(4).innerText = item.condition;

        // Actions
        const actionsCell = row.insertCell(5);
        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.innerText = 'Edit';
        editButton.onclick = () => editDevice(index);
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteDevice(index);
        
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}

// Function to add a new device
document.getElementById('deviceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const deviceName = document.getElementById('deviceName').value;
    const deviceType = document.getElementById('deviceType').value;
    const deviceBrand = document.getElementById('deviceBrand').value;
    const deviceQuantity = document.getElementById('deviceQuantity').value;
    const deviceCondition = document.getElementById('deviceCondition').value;
    

    // Add new device to inventory
    inventory.push({
        name: deviceName,
        type: deviceType,
        brand: deviceBrand,
        quantity: deviceQuantity,
        condition: deviceCondition
    });

    // Clear form
    document.getElementById('deviceForm').reset();

    // Save updated inventory to localStorage
    localStorage.setItem('inventory', JSON.stringify(inventory));

    // Re-render the table
    renderInventory();
});

// Function to delete a device from the inventory
function deleteDevice(index) {
    inventory.splice(index, 1);
    
    // Save updated inventory to localStorage
    localStorage.setItem('inventory', JSON.stringify(inventory));
    
    renderInventory();
}

// Function to edit a device
function editDevice(index) {
    const device = inventory[index];
    document.getElementById('deviceName').value = device.name;
    document.getElementById('deviceType').value = device.type;
    document.getElementById('deviceBrand').value = device.brand;
    document.getElementById('deviceQuantity').value = device.quantity;
    document.getElementById('deviceCondition').value = device.condition;

    // Remove the device from the inventory for editing (this will be added back after editing)
    deleteDevice(index);
}

// Function to search devices based on name or type
function searchDevices() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    // Filter inventory based on search term
    const filteredInventory = inventory.filter(device => 
        device.name.toLowerCase().includes(searchInput) || 
        device.type.toLowerCase().includes(searchInput)
    );

    // Render the filtered inventory
    renderInventory(filteredInventory);
}

// Initial render
renderInventory();
