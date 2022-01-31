export const searchObject = {
  searchPhrase: 'mouse',
  foundTotalPictures: 0,
  foundPictures: 0,
  page: 1,
  per_page: 12,
  key: '24469565-02e5053fcb4f2a37c5c83268e',
  safesearch: true,

  defOpt() {
    this.searchPhrase = 'mouse';
    this.foundTotalPictures = 0;
    this.foundPictures = 0;
    this.page = 1;
    this.per_page = 12;
    this.key = '24469565-02e5053fcb4f2a37c5c83268e';
    this.safesearch = true;
  },
};

export const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  PENDING_LOAD_MORE: 'pendingd',
  RESOLVE: 'resolve',
  REJECTED: 'rejected',
};

Object.freeze(Status);
