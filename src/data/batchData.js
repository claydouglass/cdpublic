export let batches = [
    {
      id: 'KT-0628',
      room: 102,
      strain: 'Kandy Terpz',
      vegStartDate: new Date('2024-06-28'),
      flowerStartDate: null,
    },
    {
      id: 'PT-0628',
      room: 102,
      strain: 'Papaya Terpz',
      vegStartDate: new Date('2024-06-28'),
      flowerStartDate: null,
    },
];

export const addBatch = (newBatch) => {
    const id = `Batch-${batches.length + 1}`;
    batches.push({ ...newBatch, id, flowerStartDate: null });
};