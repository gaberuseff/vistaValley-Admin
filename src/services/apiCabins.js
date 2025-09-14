import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.log(error)
        throw new Error('Cabins could not be loaded')
    }

    return data
}

export async function createUpdateCabin(newCabin, id) {
    console.log(newCabin, id);
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll('/', '');
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1) Create / Update query
    let query = supabase
        .from('cabins')

    // A) create cabin
    if (!id)
        query = query
            .insert([{ ...newCabin, image: imagePath }])

    // B) update cabin
    if (id)
        query = query
            .update({ ...newCabin, image: imagePath })
            .eq('id', id)

    // 2) Execute query
    const { data, error } = await query
        .select()
        .single()

    if (error) {
        console.log(error)
        throw new Error('Cabin could not be created')
    }

    // 2) upload image
    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    // 3) delete the cabin if the image upload fails
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data[0].id)

        throw new Error('Cabin could not be created')
    }

    return data
}

export async function deleteCabin(id) {
    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.log(error)
        throw new Error('Cabin could not be deleted')
    }
}