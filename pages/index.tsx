import React from 'react';
import Layout from '../components/layout/Layout';

const Home = () => {
  return <div className="text-chelsea">첼시특별시</div>;
};

Home.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Home;
