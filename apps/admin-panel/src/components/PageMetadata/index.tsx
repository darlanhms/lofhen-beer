import Head from 'next/head';

interface PageMetadataProps {
  title: string;
}

const PageMetadata = ({ title }: PageMetadataProps): React.ReactElement => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default PageMetadata;
