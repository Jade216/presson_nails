const EasyPost = require('@easypost/api');
const api = new EasyPost(process.env.EASYPOST_API_KEY);

async function createShipment(fromAddress, toAddress, parcel) {
  try {
    const shipment = await api.Shipment.create({
      from_address: fromAddress,
      to_address: toAddress,
      parcel: parcel,
    });

    await shipment.buy(shipment.lowestRate());
    return shipment.postage_label.label_url;
  } catch (error) {
    console.error('EasyPost error:', error);
    throw new Error('Shipment creation failed');
  }
}
