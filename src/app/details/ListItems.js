export default function listItems({items}) {
    return <>

        <div id="listItems">
            {items.map((item) => (
                <Item item={item.id}/>
            ))}
        </div>
    
    
    </>
}