const copyFile = async (source, destination) => {
  try {
    const result = await window.electron.copyFile(source, destination)
    if (result.success) {
      console.log('File copied successfully')
    } else {
      console.log(`Error: ${result.message}`)
    }
  } catch (error) {
    console.log('An unexpected error occurred')
    console.error(error)
  }
}

export default copyFile
