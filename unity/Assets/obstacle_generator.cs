using UnityEngine;
using System.Collections;

public class obstacle_generator : MonoBehaviour {

	public GameObject stone;

	private float stoneX;
	private float stoneY;

	private float delta = 0;
	private float delay = 1.5f;

	private ArrayList list = new ArrayList();

	// Use this for initialization
	void Start () {
		stoneX = stone.transform.position.x;
		stoneY = stone.transform.position.y;
	}
	
	// Update is called once per frame
	void Update () {
		delta += Time.deltaTime;
		if (delta >= delay){
			delta = 0;

			GameObject newStone = (GameObject) Instantiate(stone);
			newStone.transform.position = new Vector3(stoneX, stoneY, stone.transform.position.z);

			list.Add (newStone);

			if (list.Count > 1){
				Destroy((GameObject) list[0]);
				list.RemoveAt(0);
			}
		}
	}
}
