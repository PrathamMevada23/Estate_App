import { listData } from '../../lib/dummydata'
import './listPage.scss'
import Filter from '../../components/filter/filter'
import Card from "../../components/card/card"
import Map from '../../components/map/Map'
import { Await, useLoaderData } from 'react-router-dom'
import { Suspense } from 'react'

function ListPage(){
  const data = useLoaderData()

  return ( 
    <div className='listPage'>
      <div className="listContianer">
        <div className="wrapper">
          <Filter/>
            <Suspense fallback={<p>Loading...</p>}>
              <Await 
                resolve={data.postResponse}
                  errorElement={<p>Error loading posts!
                  </p>}
              >
                {(postResponse) => postResponse.data.map(post=>(
                  <Card key={post.id} item={post}/>
                ))}
              </Await>
            </Suspense>
        </div>
      </div>

      <div className="mapContianer">
      <Suspense fallback={<p>Loading...</p>}>
              <Await 
                resolve={data.postResponse}
                  errorElement={<p>Error loading posts!
                  </p>}
              >
                {(postResponse) => 
                  <Map items={postResponse.data} />}
              </Await>
            </Suspense>
      </div>
    </div>
  )
}

export default ListPage