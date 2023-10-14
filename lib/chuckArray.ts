const chunkArray = (array: any[], size: number) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, index) =>
      array.slice(index * size, index * size + size)
    );
  };

export default chunkArray