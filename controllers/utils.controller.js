const mappingStock = stock => {
    return stock.reduce((stores, inventory) => {
        const idx = stores.findIndex(element => element._id === inventory.store._id);
        inventory.fruit._doc.stock = inventory.stock;
        if(idx !== -1) {
            stores[idx].fruits.push({...inventory.fruit._doc});
        } else {
            stores.push({...inventory.store._doc, fruits: [inventory.fruit]});
        }
        return stores;
    }, []);
};

module.exports = {mappingStock};
