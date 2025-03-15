import { useParams } from "react-router";
import BucketView from "../components/BucketView"
import { useEffect, useState } from "react";
import { get } from "../utils/apiClient";

interface Buckets {
  bucketId: string;
  bucketName: string;
  gid: string;
  items: string[]
}

const MyBuckets = () => {
  const { gid = '' } = useParams();
  const [buckets, setBuckets] = useState<Buckets[]>([]);

  const fetchBuckets = async (gid: string) => {
    let v;
    const res = await get(`/groups/${gid}/buckets`, v);
    setBuckets(JSON.parse(res));
  }

  useEffect(() => {
    fetchBuckets(gid)
  }, [gid])
  return (
    <div>
        <BucketView title={'My'} buckets={buckets}/>
    </div>
  )
}

export default MyBuckets