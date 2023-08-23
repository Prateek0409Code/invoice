const newInvoice = document.getElementById('newInvoice');
    const invoiceTable = document.getElementById('invoiceTable');
    const newProductButton = document.getElementById('newProductButton');
    const generateInvoiceBtn = document.getElementById('generateInvoiceBtn');
    const invoiceDetails = document.getElementById('invoiceDetails');
    const grandTotal = document.getElementById('grandTotal');
    let srNo = 1;
    let totalAmount = 0;
    const items = [];

    newProductButton.addEventListener('click', function() {
      const product = document.getElementById('product').value;
      const rate = parseFloat(document.getElementById('rate').value);
      const quantity = parseInt(document.getElementById('quantity').value);
      const total = rate * quantity;

      const newRow = `<tr>
        <td>${srNo}</td>
        <td>${product}</td>
        <td>${rate.toFixed(2)}</td>
        <td>${quantity}</td>
        <td>${total.toFixed(2)}</td>
        <td><button class="deleteBtn">Delete Product</button></td>
      </tr>`;
      
      invoiceTable.querySelector('tbody').insertAdjacentHTML('beforeend', newRow);
      
      totalAmount += total;
      grandTotal.textContent = totalAmount.toFixed(2);
      items.push({ product, rate, quantity: quantity });
      
      srNo++;
    });

    invoiceTable.addEventListener('click', function(event) {
      if (event.target.classList.contains('deleteBtn')) {
        const row = event.target.parentNode.parentNode;
        const totalCell = row.querySelector('td:nth-child(5)');
        const total = parseFloat(totalCell.textContent);
        
        totalAmount -= total;
        grandTotal.textContent = totalAmount.toFixed(2);
        
        row.remove();
        adjustSrNumbers();
      }
    });

    function adjustSrNumbers() {
      const rows = invoiceTable.querySelectorAll('tbody tr');
      srNo = 1;
      rows.forEach((row, index) => {
        row.querySelector('td:first-child').textContent = srNo++;
      });
    }

    generateInvoiceBtn.addEventListener('click', function() {
            if (event.keyCode == 36) {
                button.click();
            }
      const name = document.getElementById('name').value;
      const mobile = document.getElementById('mobile').value;
      const date = document.getElementById('date').value;
      const invoiceNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      const distinctProducts = Array.from(new Set([...document.querySelectorAll('#invoiceTable tbody td:nth-child(2)')].map(td => td.textContent)));
      
      const invoiceDetailsHTML = `
        <h2>Invoice Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Date of Purchase:</strong> ${date}</p>
        <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
        <p><strong>Items:</strong></p>
        <ul>
          ${items.map(item => `<li>${item.product} - ${item.quantity} x ${item.rate.toFixed(2)}</li>`).join('')}
        </ul>
        <p><strong>Number of Products Ordered:</strong> ${distinctProducts.length}</p>
        <p><strong>Grand Total:</strong> ${totalAmount.toFixed(2)}</p>

      `;
      
      invoiceDetails.innerHTML = invoiceDetailsHTML;
    });