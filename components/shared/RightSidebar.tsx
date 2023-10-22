import { fetchSuggestedUsers } from "@/lib/actions/user.action"
import { currentUser } from "@clerk/nextjs"
import UserCard from "../cards/UserCard"
import { fetchCommunities } from "@/lib/actions/community.actions"
const RightSidebar = async () => {

  const user = await currentUser()
  if(!user) return null

  const results = await fetchSuggestedUsers(user.id)

  const suggestedCOmmunities = await fetchCommunities({ pageSize: 4 });

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Communities</h3>
        {suggestedCOmmunities.communities.length > 0 ? (
          suggestedCOmmunities.communities.map((community)=> (
            <UserCard
            key={community.id}
            id={community.id}
            name={community.name}
            username={community.username}
            imgUrl={community.image}
            personType='Community'
          />
          ))
        ):  (
          <p className='!text-base-regular text-light-3'>
            No communities yet
          </p>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
        {results.map((user) => (
          <UserCard
          key={user.id}
          id={user.id}
          name={user.name}
          username={user.username}
          imgUrl={user.image}
          personType='User'
          />
        ))}
      </div>
    </section>
  )
}

export default RightSidebar
