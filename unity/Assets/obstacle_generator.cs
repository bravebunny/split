using UnityEngine;
using System.Collections;

public class obstacle_generator : MonoBehaviour {

	public GameObject stone;

	public GameObject camera;
	private float stoneX = 21;
	private float stoneY = -1;
	private float stoneZ = 0;

	private float delta = 0;
	private float delay = 1.5f;

	private ArrayList list = new ArrayList();

	private bool topLeft = true;
	private bool topRight = false;
	private bool bottomLeft = false;
	private bool bottomRight = false;

	// Use this for initialization
	void Start () {
		stoneX += camera.transform.position.x;
		stoneY += camera.transform.position.y;
		stoneZ += camera.transform.position.z;

	}
	
	// Update is called once per frame
	void Update () {
		delta += Time.deltaTime;
		if (delta >= delay){
			delta = 0;
			delay = Random.Range(1000, 3000)/1000f;

			GameObject newStone = (GameObject) Instantiate(stone);
			newStone.transform.position = new Vector3(stoneX, stoneY, stoneZ);

			list.Add (newStone);

			if (list.Count > 10){
				Destroy((GameObject) list[0]);
				list.RemoveAt(0);
			}
		}
	}
}
